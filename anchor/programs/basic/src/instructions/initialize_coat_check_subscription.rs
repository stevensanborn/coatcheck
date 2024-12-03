
use anchor_lang::prelude::*;
use crate::states::*;
use crate::instructions::COAT_CHECK_SEED;
use crate::errors::ErrorCode;

pub const COAT_CHECK_SUBSCRIPTION_SEED: &str = "COAT_CHECK_SUBSCRIPTION";



pub fn validate_price_and_duration( price: u64, duration: u32) -> Result<()>{
        if price == 0 {
            return Err(ErrorCode::InvalidPrice.into());
        }

        if duration == 0 {
            return Err(ErrorCode::InvalidDuration.into());
        }
        Ok(())
    }

pub fn init_coat_check_subscription(ctx: Context<InitializeCoatCheckSubscription>,str_id: String, duration: u32, price: u64) -> Result<()> {

    validate_price_and_duration(price, duration)?;      


    let coat_check_subscription = &mut ctx.accounts.coat_check_subscription;
    coat_check_subscription.str_id = str_id;
    coat_check_subscription.duration = duration;
    coat_check_subscription.price = price;
    coat_check_subscription.bump = ctx.bumps.coat_check_subscription;
    coat_check_subscription.parent_coat_check = ctx.accounts.parent.key();

    Ok(())
}


#[derive(Accounts)]
#[instruction(str_id: String)]
pub struct InitializeCoatCheckSubscription<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds=[COAT_CHECK_SEED.as_bytes(),
            authority.key().as_ref(),
            parent.str_id.as_bytes()], 
            bump=parent.bump
    )]
    pub parent: Account<'info, CoatCheck>,

    #[account(init,
         payer = authority, 
         space = 8 + CoatCheckSubscription::INIT_SPACE,
         seeds = [COAT_CHECK_SUBSCRIPTION_SEED.as_bytes(),
                    authority.key().as_ref(),
                    str_id.as_bytes()
                    ], bump)]
    pub coat_check_subscription: Account<'info, CoatCheckSubscription>,

    pub system_program: Program<'info, System>,
}
