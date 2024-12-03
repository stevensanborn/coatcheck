
use anchor_lang::prelude::*;
use crate::states::*;


pub fn close_subscription_state_account(_ctx: Context<CloseSubscriptionState>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct CloseSubscriptionState<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, close = authority)]
    pub coat_check_subscription_state: Account<'info, CoatCheckSubscriptionState>,
    pub system_program: Program<'info, System>,
}

