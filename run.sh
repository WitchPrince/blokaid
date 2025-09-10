#!/bin/bash

# Seed phrase ile keypair kurtar
solana-keygen recover "prompt://?key=0/0" -o recovered.json --force

# Pubkey'i al
PUBKEY=$(solana-keygen pubkey recovered.json)

echo "📌 Cüzdanınızın Devnet Pubkey'i: $PUBKEY"

# Bakiyeyi göster
solana balance --keypair recovered.json --url https://api.devnet.solana.com

# Airdrop gönder
echo "💧 5 SOL airdrop isteniyor..."
solana airdrop 5 $PUBKEY --url https://api.devnet.solana.com

# Anchor build
anchor build

#Anchor Deploy
anchor deploy --provider.cluster devnet

#Test öncesi bakiye bildirimi
solana balance $PUBKEY

#Proje test
ts-node tests/blokaid.ts
