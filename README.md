Öncelikle projedenin çalıştırılması için "npm install" komutunu çalıştırıyoruz.

Açıklar olduğu yönünde uyarı alırsak "npm audit fix --force" komutunu çalıştırmamız gerek.

Ardından şuanki cüzdanımızı devnet üzerinde test edebilmek için "solana-keygen recover "prompt://?key=0/0" -o recovered.json", "solana balance --keypair recovered.json" komutlarını sırasıyla çalıştırdıktan sonra cüzdanımızın
key-phrase'lerini giriyoruz. Karşımıza cüzdanımızın devnet versiyonunun pubkey'i çıkacak. Bu pubkeye "solana airdrop 5 <devnet-cüzdan-pubkeyi>" komutu ile 5 SOL yükledikten sonra devnet cüzdanımız hazır.

Son olarak sırasıyla "anchor build", "anchor deploy --provider.cluster github" (deploy aşaması bazen bağlantı sorunları yüzünden hata alabilir, başarılı olana kadar çalıştırmamız lazım.), "ts-node tests/blokaid.ts" komutlarını
çalıştırıyoruz. (Bu aşamada makinemizde solana, anchor ve ts-node modüllerinin yüklü olması lazım.)

Karşımıza gelen seçim ekranında hangi hesaba SOL göndermek istediğimizi numarası ile belli ettikten sonra kaç SOL göndermek istediğimizi seçiyoruz ve işlem gerçekleşiyor.
