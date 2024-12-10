use anchor_lang::prelude::*;
use crate::states::*;
use crate::errors::ErrorCode;
use crate::instructions::COAT_CHECK_SUBSCRIPTION_SEED;
use crate::instructions::COAT_CHECK_SEED;

pub const COAT_CHECK_SUBSCRIPTION_STATE_SEED: &str = "COAT_CHECK_SUBSCRIPTION_STATE";

pub fn init_coat_check_subscription_state(ctx: Context<InitSubscriptionState>) -> Result<()> {

    
    //check if the subscription authority is the same as the parent
    if ctx.accounts.subscription_authority.key() != ctx.accounts.parent_coat_check.authority {
        return Err(ErrorCode::InvalidSubscriptionAuthority.into());
    }

    //save the subscription details
    let coat_check_subscription_state = &mut ctx.accounts.coat_check_subscription_state;
    coat_check_subscription_state.duration = 0;
    coat_check_subscription_state.price = 0;
    coat_check_subscription_state.timestamp = 0;

    coat_check_subscription_state.parent_subscription = ctx.accounts.parent_subscripton.key();
    
    Ok(())
}


#[derive(Accounts)]
// #[instruction(duration: u32, price: u64)]
pub struct InitSubscriptionState<'info> {
        // user 
    #[account(mut)]
    pub user: Signer<'info>,

        
    //parent coat check
    #[account(
        seeds=[COAT_CHECK_SEED.as_bytes(),
        parent_coat_check.authority.key().as_ref(),
        parent_coat_check.str_id.as_bytes()],  //verifty seed
        bump=parent_coat_check.bump, //verify bump
        constraint = parent_subscripton.parent_coat_check == parent_coat_check.key())] //verify that the subscription parent is the same as the parent coat check
    pub parent_coat_check: Account<'info, CoatCheck>,

    //subscription parent
    #[account(
    seeds=[COAT_CHECK_SUBSCRIPTION_SEED.as_bytes(),
        subscription_authority.key().as_ref(), 
        parent_subscripton.str_id.as_bytes()], 
    // constraint = parent_subscripton.duration == duration && parent_subscripton.price == price, //check if the duration and price are the same as the parent
    bump=parent_subscripton.bump)]
    pub parent_subscripton: Account<'info, CoatCheckSubscription>,


    //coat check subscription state
    #[account( 
        init, 
        payer = user, 
        space = 8 + CoatCheckSubscriptionState::INIT_SPACE, 
    seeds = [COAT_CHECK_SUBSCRIPTION_STATE_SEED.as_bytes(), 
    user.key().as_ref(),
    parent_subscripton.str_id.as_bytes()], bump )]
    pub coat_check_subscription_state: Account<'info, CoatCheckSubscriptionState>,
    
    //subscription authority
    #[account(mut)]
    pub subscription_authority: SystemAccount<'info>,

    //system program
    pub system_program: Program<'info, System>,
}