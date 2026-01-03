import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blokaid } from "../target/types/blokaid";
import * as fs from "fs";
import * as readline from "readline";
import * as bip39 from "bip39";
import * as ed25519 from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

// JSON'dan kişi listesi al
const recipients = JSON.parse(
  fs.readFileSync("./recipients.json", "utf-8")
).recipients;

// Kullanıcıdan giriş almak için readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Seed phrase ile keypair oluşturma fonksiyonu
function keypairFromMnemonic(mnemonic: string): Keypair {
  // Fazladan boşlukları temizle ve normalize et
  const normalized = mnemonic.trim().replace(/\s+/g, " ").toLowerCase();
  const seed = bip39.mnemonicToSeedSync(normalized);
  const derived = ed25519.derivePath("m/44'/501'/0'/0'", seed.toString("hex"));
  return Keypair.fromSeed(derived.key);
}

// Seed phrase sor
rl.question("Cüzdanınızın 12 kelimelik seed phrase'ini girin: ", (mnemonicInput) => {
  const keypair = keypairFromMnemonic(mnemonicInput);
  const provider = new anchor.AnchorProvider(
    new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
    new anchor.Wallet(keypair),
    {}
  );
  anchor.setProvider(provider);
  const donor = provider.wallet;

  // Kişi seçimi
  console.log("\n=== Bağış Yapılacak Kişiler ===");
  recipients.forEach((r: any) => {
    console.log(`${r.id}) ${r.name} - ${r.pubkey}`);
  });

  rl.question("Bir numara seçin: ", (answer) => {
    const selected = recipients.find((r: any) => r.id === parseInt(answer));
    if (!selected) {
      console.log("Geçersiz seçim!");
      rl.close();
      return;
    }
    const recipientPubkey = new anchor.web3.PublicKey(selected.pubkey);
    console.log(`Seçilen kişi: ${selected.name} (${recipientPubkey.toBase58()})`);

    // Gönderilecek miktarı sor
    const askAmount = async () => {
      rl.question("Ne kadar SOL göndermek istiyorsunuz? ", async (amountInput) => {
        const amountSol = parseFloat(amountInput);
        if (isNaN(amountSol) || amountSol <= 0) {
          console.log("Geçersiz miktar!");
          askAmount();
          return;
        }

        // Donor bakiyesi kontrolü
        const donorBalance = await provider.connection.getBalance(donor.publicKey);
        const donorBalanceSol = donorBalance / anchor.web3.LAMPORTS_PER_SOL;
        if (amountSol > donorBalanceSol) {
          console.log(
            `Hata: Girdiğiniz miktar cüzdan bakiyenizden fazla! Mevcut bakiye: ${donorBalanceSol.toFixed(
              6
            )} SOL`
          );
          askAmount();
          return;
        }

        const amountLamports = amountSol * anchor.web3.LAMPORTS_PER_SOL;

        // Transfer öncesi bakiyeler
        const recipientBalanceBefore = await provider.connection.getBalance(recipientPubkey);
        console.log(
          "\nÖnceki bakiyeler -> Donor:",
          donorBalanceSol.toFixed(6),
          "SOL, Recipient:",
          (recipientBalanceBefore / anchor.web3.LAMPORTS_PER_SOL).toFixed(6),
          "SOL"
        );

        // Transfer işlemi
        const program = anchor.workspace.Blokaid as Program<Blokaid>;
        const tx = await program.methods
          .sendDonation(new anchor.BN(amountLamports))
          .accounts({
            donor: donor.publicKey,
            recipient: recipientPubkey,
            //systemProgram: anchor.web3.SystemProgram.programId,
          })
          .rpc();

        console.log("✅ Bağış işlemi başarılı. Tx ID:", tx);

        // Transfer sonrası bakiyeler
        const donorBalanceAfter = await provider.connection.getBalance(donor.publicKey);
        const recipientBalanceAfter = await provider.connection.getBalance(recipientPubkey);
        console.log(
          "Sonraki bakiyeler -> Donor:",
          (donorBalanceAfter / anchor.web3.LAMPORTS_PER_SOL).toFixed(6),
          "SOL, Recipient:",
          (recipientBalanceAfter / anchor.web3.LAMPORTS_PER_SOL).toFixed(6),
          "SOL"
        );

        rl.close();
      });
    };

    askAmount();
  });
});
