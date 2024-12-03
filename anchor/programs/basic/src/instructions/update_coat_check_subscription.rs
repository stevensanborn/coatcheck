
use anchor_lang::prelude::*;
use crate::states::*;
use crate::instructions::COAT_CHECK_SEED;
// use crate::errors::ErrorCode;

use crate::instructions::validate_price_and_duration;
use crate::instructions::COAT_CHECK_SUBSCRIPTION_SEED;

pub fn up_coat_check_subscription(ctx: Context<UpdateCoatCheckSubscription>, duration: u32, price: u64) -> Result<()> {
    msg!("updating subscription");
    validate_price_and_duration(price, duration)?;      
    msg!("updating subscription validated {} {}", duration, price);
    let coat_check_subscription = &mut ctx.accounts.coat_check_subscription;
    coat_check_subscription.duration = duration;
    coat_check_subscription.price = price;
    Ok(())
}


#[derive(Accounts)]
pub struct UpdateCoatCheckSubscription<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        seeds=[COAT_CHECK_SEED.as_bytes(),
            authority.key().as_ref(),
            parent.str_id.as_bytes()
            ], 
            bump=parent.bump
    )]
    pub parent: Account<'info, CoatCheck>,

    #[account(
        mut,
         seeds = [COAT_CHECK_SUBSCRIPTION_SEED.as_bytes(),
                    authority.key().as_ref(),
                    coat_check_subscription.str_id.as_bytes()
                    ], bump)]
    pub coat_check_subscription: Account<'info, CoatCheckSubscription>,

    pub system_program: Program<'info, System>,
}
