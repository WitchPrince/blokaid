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

# Anchor deploy
DEPLOY_OUTPUT=$(anchor deploy --provider.cluster devnet)

# Program ID'yi parse et ve .env dosyasına yaz
PROGRAM_ID=$(echo "$DEPLOY_OUTPUT" | grep "Program Id:" | awk '{print $3}')
echo "PROGRAM_ID=$PROGRAM_ID" > .env
echo "📌 Program ID: $PROGRAM_ID .env dosyasına kaydedildi."

# Test öncesi bakiye bildirimi
solana balance $PUBKEY

# Proje test
ts-node tests/blokaid.ts
