/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "AfZttkDrvkzU4eZNBSESGeESdnotdxHT6t9BGqrUkxfk",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeCoatCheck",
      "discriminator": [
        33,
        3,
        169,
        70,
        173,
        143,
        174,
        118
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "coatCheck",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "closeSubscription",
      "discriminator": [
        33,
        214,
        169,
        135,
        35,
        127,
        78,
        7
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "coatCheckSubscription",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "closeSubscriptionState",
      "discriminator": [
        163,
        6,
        201,
        48,
        24,
        133,
        140,
        14
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "coatCheckSubscriptionState",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "coatCheck",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "arg",
                "path": "strId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeSubscription",
      "discriminator": [
        208,
        156,
        144,
        38,
        56,
        65,
        152,
        18
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "parent",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "parent.str_id",
                "account": "coatCheck"
              }
            ]
          }
        },
        {
          "name": "coatCheckSubscription",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "arg",
                "path": "strId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "duration",
          "type": "u32"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeSubscriptionState",
      "discriminator": [
        88,
        159,
        220,
        198,
        117,
        33,
        55,
        58
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "parentCoatCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75
                ]
              },
              {
                "kind": "account",
                "path": "parent_coat_check.authority",
                "account": "coatCheck"
              },
              {
                "kind": "account",
                "path": "parent_coat_check.str_id",
                "account": "coatCheck"
              }
            ]
          }
        },
        {
          "name": "parentSubscripton",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78
                ]
              },
              {
                "kind": "account",
                "path": "subscriptionAuthority"
              },
              {
                "kind": "account",
                "path": "parent_subscripton.str_id",
                "account": "coatCheckSubscription"
              }
            ]
          }
        },
        {
          "name": "coatCheckSubscriptionState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "parent_subscripton.str_id",
                "account": "coatCheckSubscription"
              }
            ]
          }
        },
        {
          "name": "subscriptionAuthority",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "subscribe",
      "discriminator": [
        254,
        28,
        191,
        138,
        156,
        179,
        183,
        53
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "parentCoatCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75
                ]
              },
              {
                "kind": "account",
                "path": "parent_coat_check.authority",
                "account": "coatCheck"
              },
              {
                "kind": "account",
                "path": "parent_coat_check.str_id",
                "account": "coatCheck"
              }
            ]
          }
        },
        {
          "name": "parentSubscripton",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78
                ]
              },
              {
                "kind": "account",
                "path": "subscriptionAuthority"
              },
              {
                "kind": "account",
                "path": "parent_subscripton.str_id",
                "account": "coatCheckSubscription"
              }
            ]
          }
        },
        {
          "name": "coatCheckSubscriptionState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "parent_subscripton.str_id",
                "account": "coatCheckSubscription"
              }
            ]
          }
        },
        {
          "name": "subscriptionAuthority",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "duration",
          "type": "u32"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateSubscription",
      "discriminator": [
        178,
        93,
        201,
        243,
        105,
        32,
        73,
        210
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "parent",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "parent.str_id",
                "account": "coatCheck"
              }
            ]
          }
        },
        {
          "name": "coatCheckSubscription",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  65,
                  84,
                  95,
                  67,
                  72,
                  69,
                  67,
                  75,
                  95,
                  83,
                  85,
                  66,
                  83,
                  67,
                  82,
                  73,
                  80,
                  84,
                  73,
                  79,
                  78
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "coat_check_subscription.str_id",
                "account": "coatCheckSubscription"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "duration",
          "type": "u32"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "coatCheck",
      "discriminator": [
        80,
        125,
        35,
        160,
        51,
        127,
        157,
        77
      ]
    },
    {
      "name": "coatCheckSubscription",
      "discriminator": [
        123,
        198,
        214,
        234,
        255,
        188,
        23,
        131
      ]
    },
    {
      "name": "coatCheckSubscriptionState",
      "discriminator": [
        224,
        64,
        226,
        102,
        233,
        134,
        230,
        93
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6001,
      "name": "invalidDuration",
      "msg": "Invalid duration"
    },
    {
      "code": 6002,
      "name": "invalidTimestamp",
      "msg": "Invalid timestamp"
    },
    {
      "code": 6003,
      "name": "invalidSubscriptionAuthority",
      "msg": "Invalid subscription authority"
    },
    {
      "code": 6004,
      "name": "invalidSubscriptionParent",
      "msg": "Invalid subscription parent"
    }
  ],
  "types": [
    {
      "name": "coatCheck",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "strId",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "coatCheckSubscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parentCoatCheck",
            "type": "pubkey"
          },
          {
            "name": "strId",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u32"
          },
          {
            "name": "duration",
            "type": "u32"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "coatCheckSubscriptionState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "parentSubscription",
            "type": "pubkey"
          },
          {
            "name": "duration",
            "type": "u32"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u32"
          }
        ]
      }
    }
  ]
};
