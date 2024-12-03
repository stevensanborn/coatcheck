use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use crate::states::*;
use crate::errors::ErrorCode;
use crate::instructions::initialize_coat_check_subscription::validate_price_and_duration;
use crate::instructions::COAT_CHECK_SUBSCRIPTION_SEED;
use crate::instructions::COAT_CHECK_SEED;
use crate::instructions::COAT_CHECK_SUBSCRIPTION_STATE_SEED;


pub fn coat_check_subscribe(ctx: Context<Subscribe>, duration: u32, price: u64) -> Result<()> {

    validate_price_and_duration(price, duration)?;

    //check if the subscription authority is the same as the parent
    if ctx.accounts.subscription_authority.key() != ctx.accounts.parent_coat_check.authority {
        return Err(ErrorCode::InvalidSubscriptionAuthority.into());
    }

    if ctx.accounts.parent_coat_check.key() != ctx.accounts.parent_subscripton.parent_coat_check {
        return Err(ErrorCode::InvalidSubscriptionParent.into());
    }

    validate_price_and_duration(price, duration)?;


    // Transfer from the user to the subscription authority

    let from_account = &ctx.accounts.user;
    let to_account = &ctx.accounts.subscription_authority;


    let transfer_instruction = system_instruction::transfer(
        from_account.key, 
        to_account.key,
        price);

    //invoke the transfer instruction
    anchor_lang::solana_program::program::invoke(
        &transfer_instruction,
        &[
            from_account.to_account_info(),
            to_account.to_account_info()
        ]

    
     
    )?;

    ctx.accounts.coat_check_subscription_state.duration = duration; //set the duration  
    ctx.accounts.coat_check_subscription_state.price = price; //set the price
    ctx.accounts.coat_check_subscription_state.timestamp = Clock::get()?.unix_timestamp as u32; //set the timestamp


    Ok(())
}


#[derive(Accounts)]
#[instruction(duration: u32, price: u64)]
pub struct Subscribe<'info> {

     //parent coat check
    
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
      #[account(mut 
      ,seeds=[COAT_CHECK_SUBSCRIPTION_SEED.as_bytes(), subscription_authority.key().as_ref(), parent_subscripton.str_id.as_bytes()], 
      constraint = parent_subscripton.duration == duration && parent_subscripton.price == price, //check if the duration and price are the same as the parent
      bump=parent_subscripton.bump)]
      pub parent_subscripton: Account<'info, CoatCheckSubscription>,
  
  
      //coat check subscription state
      #[account( 
        mut,
          seeds = [COAT_CHECK_SUBSCRIPTION_STATE_SEED.as_bytes(), 
            user.key().as_ref(),
            parent_subscripton.str_id.as_bytes()], 
          bump)]
      pub coat_check_subscription_state: Account<'info, CoatCheckSubscriptionState>,
      
      //subscription authority
      #[account(mut)]
      pub subscription_authority: SystemAccount<'info>,
  
        //system program
        pub system_program: Program<'info, System>,

}

