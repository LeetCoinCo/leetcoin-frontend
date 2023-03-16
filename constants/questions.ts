export interface Question {
  Title: string;
  Description: string;
  Example: string;
  QuestionId: number;
  Difficulty: string;
  Frequency: number;
  Rating: number;
  Category: string;
  Stub: string;
}
const questions: { [key: number]: Question } = {
  1: {
    Title: "Simple Storage",
    Description:
      "Create a simple storage smart contract that stores a single unsigned 32-bit integer. The contract should have a `get` function to retrieve the stored value and a `set` function to update the stored value.",
    Example:
      "Input: set(42); Output: Value set to 42; Input: get(); Output: 42",
    QuestionId: 1,
    Difficulty: "Easy",
    Frequency: 60,
    Rating: 4.5,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod simple_storage {
    #[ink(storage)]
    pub struct SimpleStorage {
        // TODO, add your code here
    }

    impl SimpleStorage {
        #[ink(constructor)]
        pub fn new() -> Self {
            // TODO, add your code here
        }

        // TODO, add your functions here
    }
}
`,
  },
  2: {
    Title: "Counter",
    Description:
      "Create a Counter smart contract that allows users to increment and decrement a counter value. The contract should have `increment` and `decrement` functions, and a `get` function to retrieve the current value of the counter.",
    Example: "Input: increment(); increment(); get(); Output: 2",
    QuestionId: 2,
    Difficulty: "Easy",
    Frequency: 50,
    Rating: 4,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod counter {
    #[ink(storage)]
    pub struct Counter {
        // TODO, add your code here
    }

    impl Counter {
        #[ink(constructor)]
        pub fn new() -> Self {
            // TODO, add your code here
        }

        // TODO, add your functions here
    }
}
`,
  },
  3: {
    Title: "Simple Token",
    Description:
      "Create a simple token smart contract that allows users to mint, transfer, and check their token balance. Implement `mint`, `transfer`, and `get_balance` functions.",
    Example: "Input: mint(100); get_balance(); Output: 100",
    QuestionId: 3,
    Difficulty: "Med",
    Frequency: 70,
    Rating: 4.5,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod simple_token {
    #[ink(storage)]
    pub struct SimpleToken {
        balances: ink_prelude::collections::HashMap<AccountId, Balance>,
    }

    // Add your implementation here
}`,
  },
  4: {
    Title: "Voting",
    Description:
      "Create a voting smart contract that allows users to propose options and vote on them. Implement `propose_option`, `vote`, and `get_results` functions. The contract should prevent users from voting more than once.",
    Example:
      "Input: propose_option('Option 1'); vote(0); get_results(); Output: {'Option 1': 1}",
    QuestionId: 4,
    Difficulty: "Med",
    Frequency: 40,
    Rating: 4.2,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod voting {
    #[ink(storage)]
    pub struct Voting {
        options: ink_prelude::collections::HashMap<u32, (String, u32)>,
        voters: ink_prelude::collections::HashMap<AccountId, bool>,
    }

    // Add your implementation here
}`,
  },
  5: {
    Title: "Escrow",
    Description:
      "Create an escrow smart contract that allows two parties to lock funds and release them upon agreement. Implement `lock_funds`, `release_funds`, and `refund_funds` functions.",
    Example: "Input: lock_funds(); release_funds(); Output: Funds released",
    QuestionId: 5,
    Difficulty: "Hard",
    Frequency: 30,
    Rating: 4.8,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod escrow {
    #[ink(storage)]
    pub struct Escrow {
        seller: AccountId,
        buyer: AccountId,
        amount: Balance,
        status: EscrowStatus,
    }

    // Add your implementation here
}
`,
  },
  6: {
    Title: "Multi-Signature Wallet",
    Description:
      "Create a multi-signature wallet smart contract that requires multiple confirmations for transactions. Implement `propose_transaction`, `confirm_transaction`, and `execute_transaction` functions.",
    Example:
      "Input: propose_transaction(); confirm_transaction(); execute_transaction(); Output: Transaction executed",
    QuestionId: 6,
    Difficulty: "Hard",
    Frequency: 20,
    Rating: 4.7,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod multisig_wallet {
    #[ink(storage)]
    pub struct MultisigWallet {
        owners: ink_prelude::collections::HashMap<AccountId, bool>,
        required_confirmations: u32,
        transactions: ink_prelude::collections::HashMap<u32, (Hash, Balance, AccountId, u32, bool)>,
        confirmations: ink_prelude::collections::HashMap<u32, ink_prelude::collections::HashMap<AccountId, bool>>,
    }

    // Add your implementation here
}
`,
  },
  7: {
    Title: "Simple Auction",
    Description:
      "Create a simple auction smart contract that allows users to bid on an item. Implement `place_bid`, `withdraw`, and `finalize_auction` functions. The contract should prevent bids after the auction has ended.",
    Example:
      "Input: place_bid(100); finalize_auction(); Output: Auction finalized",
    QuestionId: 7,
    Difficulty: "Med",
    Frequency: 45,
    Rating: 4.3,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod simple_auction {
    #[ink(storage)]
    pub struct SimpleAuction {
        auction_end: Timestamp,
        highest_bidder: AccountId,
        highest_bid: Balance,
    }

    // Add your implementation here
}
`,
  },
  8: {
    Title: "Timed Lock",
    Description:
      "Create a timed lock smart contract that allows users to lock their funds for a specified duration. Implement `lock`, `unlock`, and `get_remaining_time` functions. The contract should prevent withdrawals before the lock duration has elapsed.",
    Example: "Input: lock(10); unlock(); Output: Cannot unlock yet",
    QuestionId: 8,
    Difficulty: "Med",
    Frequency: 35,
    Rating: 4.1,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod timed_lock {
    #[ink(storage)]
    pub struct TimedLock {
        lock_duration: Timestamp,
        lock_end: Timestamp,
        locked_balance: Balance,
        owner: AccountId,
    }

    // Add your implementation here
}
`,
  },
  9: {
    Title: "ERC-20 Token",
    Description:
      "Create an ERC-20 compliant token smart contract that allows users to mint, transfer, and check their token balance. Implement the required functions according to the ERC-20 standard.",
    Example: "Input: mint(100); transfer(50); balanceOf(); Output: 50",
    QuestionId: 9,
    Difficulty: "Hard",
    Frequency: 25,
    Rating: 4.9,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod erc20_token {
    #[ink(storage)]
    pub struct Erc20Token {
        balances: ink_prelude::collections::HashMap<AccountId, Balance>,
        allowances: ink_prelude::collections::HashMap<(AccountId, AccountId), Balance>,
        total_supply: Balance,
    }

    // Add your implementation here
}
`,
  },
  10: {
    Title: "Decentralized Oracle",
    Description:
      "Create a decentralized oracle smart contract that allows users to request external data and receive it within the contract. Implement `request_data`, `provide_data`, and `get_data` functions.",
    Example:
      "Input: request_data('BTC/USD'); provide_data('BTC/USD', 45000); get_data('BTC/USD'); Output: 45000",
    QuestionId: 10,
    Difficulty: "Hard",
    Frequency: 15,
    Rating: 5,
    Category: "Ink!",
    Stub: `#[ink::contract]
mod decentralized_oracle {
    #[ink(storage)]
    pub struct DecentralizedOracle {
        data_requests: ink_prelude::collections::HashMap<String, Balance>,
        data_providers: ink_prelude::collections::HashMap<AccountId, bool>,
    }

    // Add your implementation here
}
`,
  },
};

export const getQuestion = (questionId: number): Question | undefined =>
  questions[questionId];

export const getQuestions = (): Question[] => Object.values(questions);
