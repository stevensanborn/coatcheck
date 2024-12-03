

use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid price")]
    InvalidPrice,

    #[msg("Invalid duration")]
    InvalidDuration,    

    #[msg("Invalid timestamp")]
    InvalidTimestamp,

    #[msg("Invalid subscription authority")]
    InvalidSubscriptionAuthority,

    #[msg("Invalid subscription parent")]
    InvalidSubscriptionParent,
}
