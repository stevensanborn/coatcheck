use anchor_lang::prelude::*;
pub mod states;
pub mod errors;
use crate::instructions::*;
pub mod instructions;

declare_id!("AfZttkDrvkzU4eZNBSESGeESdnotdxHT6t9BGqrUkxfk");

#[program]
pub mod basic {
    use super::*;
    use crate::instructions::initialize_coat_check::init_coat_check;
    use crate::instructions::initialize_coat_check_subscription::init_coat_check_subscription;
    use crate::instructions::initialize_coat_check_subscription_state::init_coat_check_subscription_state;
    use crate::instructions::coat_check_subscribe::coat_check_subscribe;

    pub fn initialize(ctx: Context<InitializeCoatCheck>, name: String) -> Result<()> {
        init_coat_check(ctx, name)
        
    }

    pub fn initialize_subscription(ctx: Context<InitializeCoatCheckSubscription>, name: String, duration: u32, price: u64) -> Result<()> {
        init_coat_check_subscription(ctx, name, duration, price)
    }

    pub fn update_subscription(ctx: Context<UpdateCoatCheckSubscription>, duration: u32, price: u64) -> Result<()> {
        up_coat_check_subscription(ctx, duration, price)
    }


    pub fn initialize_subscription_state(ctx: Context<InitSubscriptionState>) -> Result<()> {
        init_coat_check_subscription_state(ctx)
    }

    pub fn subscribe(ctx: Context<Subscribe>, duration: u32, price: u64) -> Result<()> {
        coat_check_subscribe(ctx, duration, price)
    }


    pub fn close_coat_check(ctx: Context<CloseCoatCheck>) -> Result<()> {
        close_coat_check_account(ctx)
    }   

    pub fn close_subscription(ctx: Context<CloseSubscription>) -> Result<()> {
        close_subscription_account(ctx)
    }

    pub fn close_subscription_state(ctx: Context<CloseSubscriptionState>) -> Result<()> {
        close_subscription_state_account(ctx)
    }

  

  
}
