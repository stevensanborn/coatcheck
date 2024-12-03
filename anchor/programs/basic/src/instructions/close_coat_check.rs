
use anchor_lang::prelude::*;
use crate::states::*;


pub fn close_coat_check_account(_ctx: Context<CloseCoatCheck>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct CloseCoatCheck<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, close = authority)]
    pub coat_check: Account<'info, CoatCheck>,
    pub system_program: Program<'info, System>,
}

