
use anchor_lang::prelude::*;
use crate::states::*;

pub const COAT_CHECK_SEED: &str = "COAT_CHECK";

pub fn init_coat_check(ctx: Context<InitializeCoatCheck>, str_id: String) -> Result<()> {
    let coat_check = &mut ctx.accounts.coat_check;
    coat_check.str_id = str_id;
    coat_check.bump = ctx.bumps.coat_check;
    coat_check.authority = ctx.accounts.authority.key();
    Ok(())
}


#[derive(Accounts)]
#[instruction(str_id: String)]
pub struct InitializeCoatCheck<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(init,
         payer = authority, 
         space = 8 + CoatCheck::INIT_SPACE,
         seeds = [COAT_CHECK_SEED.as_bytes(),
                    authority.key().as_ref(),
                    str_id.as_bytes()], bump)]
    pub coat_check: Account<'info, CoatCheck>,
    pub system_program: Program<'info, System>,
}
