# Blokaid

[![Solana](https://img.shields.io/badge/Solana-Mainnet%2FDevnet-black?style=flat&logo=solana)](https://solana.com/)
[![Rust](https://img.shields.io/badge/Rust-1.75%2B-orange?style=flat&logo=rust)](https://www.rust-lang.org/)
[![Anchor](https://img.shields.io/badge/Anchor-Framework-blueviolet?style=flat)](https://www.anchor-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Blokaid**, Solana blockchain üzerinde çalışan, önceden tanımlanmış hesap listelerine hızlı ve güvenli bir şekilde SOL transferi yapmanızı sağlayan Anchor tabanlı bir projedir.

[🇬🇧 English Instructions](#english) | [🇹🇷 Türkçe Talimatlar](#türkçe)

---

<a name="english"></a>
## 🇬🇧 English Instructions

### Prerequisites

Before running the project, ensure you have the following installed:

- **Solana CLI** (^2.3.8)
- **Anchor CLI** (^0.31.0)
- **Node.js & NPM** (^11.5.1)
- **Rust** (1.89.0)

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/WitchPrince/blokaid.git
    cd blokaid
    ```

2.  **Grant Permissions**
    Make the setup and run scripts executable:
    ```bash
    chmod +x gereklilikler.sh run.sh
    ```

3.  **Install Dependencies & Generate Program ID**
    Run the setup script. This will install necessary dependencies and generate a unique Program ID for your instance.
    ```bash
    ./gereklilikler.sh
    ```

4.  **Update Program ID**
    * Copy the Program ID generated in the previous step.
    * Open `programs/blokaid/src/lib.rs`.
    * Paste the ID inside the `declare_id!("YOUR_PROGRAM_ID_HERE")` macro.
    * Save the file.

    > **Note:** Steps 1-4 are one-time setup requirements.

### Usage

Once the setup is complete, you can run the project using the automation script:

```bash
./run.sh
```

**How to use the CLI:**
1.  **Airdrop (Devnet):** The script will ask for your wallet's key-phrase to fund your wallet with 5 SOL (Devnet).
2.  **Authentication:** Enter your key-phrase again to authorize the transaction.
3.  **Select Recipient:** Choose a wallet from the numbered list (`recipients.json`).
4.  **Transfer:** Enter the amount of SOL you wish to send.

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe Talimatlar

### Gereksinimler

Projeyi çalıştırmadan önce sisteminizde aşağıdakilerin yüklü olduğundan emin olun:

- **Solana CLI** (^2.3.8)
- **Anchor CLI** (^0.31.0)
- **Node.js & NPM** (^11.5.1)
- **Rust** (1.89.0)

### Kurulum ve Hazırlık

1.  **Repoyu Klonlayın**
    ```bash
    git clone https://github.com/WitchPrince/blokaid.git
    cd blokaid
    ```

2.  **İzinleri Verin**
    Gerekli script dosyalarına çalıştırma izni verin:
    ```bash
    chmod +x gereklilikler.sh run.sh
    ```

3.  **Bağımlılıkları Yükleyin ve Program ID Oluşturun**
    Kurulum scriptini çalıştırın. Bu işlem gerekli kütüphaneleri yükleyecek ve projeniz için özel bir Program ID oluşturacaktır.
    ```bash
    ./gereklilikler.sh
    ```

4.  **Program ID'yi Güncelleyin**
    * Bir önceki adımda terminalde verilen Program ID'yi kopyalayın.
    * `programs/blokaid/src/lib.rs` dosyasını açın.
    * `declare_id!("BURAYA_YAPIŞTIRIN")` satırındaki tırnak içine yeni ID'yi yapıştırın.
    * Dosyayı kaydedip çıkın.

    > **Not:** 1. ve 4. adımlar arasındaki işlemler kurulum için sadece bir kez yapılır.

### Kullanım

Kurulum tamamlandıktan sonra projeyi başlatmak için aşağıdaki komutu kullanın:

```bash
./run.sh
```

**Uygulama Adımları:**
1.  **Airdrop (Devnet):** Script, test bakiyesi yüklemek için cüzdan anahtar kelimelerinizi (key-phrase) isteyecektir. Bu işlem cüzdanınıza 5 SOL (Devnet) tanımlar.
2.  **Yetkilendirme:** Transfer işlemi için anahtar kelimelerinizi tekrar girmeniz istenir.
3.  **Alıcı Seçimi:** Listeden (`recipients.json`) SOL göndermek istediğiniz cüzdan numarasını seçin.
4.  **Transfer:** Göndermek istediğiniz SOL miktarını girin.

---

### Disclaimer / Yasal Uyarı

*TR: Bu proje geliştirme ve test amaçlıdır (Devnet). Gerçek (Mainnet) cüzdan anahtar kelimelerinizi asla güvenmediğiniz uygulamalarla paylaşmayın.*

*EN: This project is for development and testing purposes (Devnet). Never share your real (Mainnet) wallet seed phrases with untrusted applications.*
