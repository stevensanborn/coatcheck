use anchor_lang::prelude::*;


#[account]
#[derive(InitSpace)]
pub struct CoatCheck{
    #[max_len(32)]
    pub str_id: String,
    pub authority: Pubkey,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct CoatCheckSubscription {
    pub parent_coat_check: Pubkey,
    #[max_len(32)]
    pub str_id: String,
    pub timestamp: u32,
    pub duration: u32,
    pub price: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct CoatCheckSubscriptionState {
    pub parent_subscription: Pubkey,
    pub duration: u32,
    pub price: u64,
    pub timestamp: u32,
}

