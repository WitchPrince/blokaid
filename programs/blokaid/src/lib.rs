use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("Write_Your_Program_ID_Here");

#[program]
pub mod blokaid {
    use super::*;

    pub fn send_donation(ctx: Context<SendDonation>, amount: u64) -> Result<()> {
        let recipient_key = ctx.accounts.recipient.key();

        // İzinli recipient listesi
        let allowed_recipients: [&Pubkey; 4] = [
            &"Bo8ytZCu1wDMvCkcFjtoYMZ1L4yzwsVS5yjxhmD6aRin".parse().unwrap(),
            &"7gTx7Xx9cRjYUMk5zvRZfCj3vJeG2ZsvQKXaXr4mhJ2u".parse().unwrap(),
            &"4bmXeL3Y9DVHLm42kXAE9UpRpbM72wHxQE1dpUFzA2FZ".parse().unwrap(),
            &"9kvokqvpzg7fGuyYcydC4YggPa8Gx38x18FZC2196bgZ".parse().unwrap(),
        ];

        // Seçilen recipient'in listenin içinde olup olmadığı kontrolü
        require!(
            allowed_recipients.contains(&&recipient_key),
            CustomError::InvalidRecipient
        );

        // SOL transferi
        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.donor.to_account_info(),
                to: ctx.accounts.recipient.to_account_info(),
            },
        );

        system_program::transfer(cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendDonation<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,

    #[account(mut)]
    
    pub recipient: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum CustomError {
    #[msg("Recipient address is not allowed")]
    InvalidRecipient,
}
