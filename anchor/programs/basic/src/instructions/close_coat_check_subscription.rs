
use anchor_lang::prelude::*;
use crate::states::*;


pub fn close_subscription_account(_ctx: Context<CloseSubscription>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct CloseSubscription<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, close = authority)]
    pub coat_check_subscription: Account<'info, CoatCheckSubscription>,
    pub system_program: Program<'info, System>,
}

