import { PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Token addresses
const TEST_TOKEN_PUBLIC_KEY_DEV = new PublicKey(
  "4dCLhR7U8PzwXau6qfjr73tKgp5SD42aLbyo3XQNzY4V"
);
const TEST_TOKEN_PUBLIC_KEY_MAINNET = new PublicKey(
  "4N37FD6SU35ssX6yTu2AcCvzVbdS6z3YZTtk5gv7ejhE"
);

export const TEST_TOKEN_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? TEST_TOKEN_PUBLIC_KEY_MAINNET
    : TEST_TOKEN_PUBLIC_KEY_DEV;

// Faucet addresses
const FAUCET_DATA_PUB_KEY_DEV = new PublicKey(
  "GhHAUWzijk3e3pUTJbwAFjU3v51hkrpujnEhhnxtp8Q7"
);
const FAUCET_DATA_PUB_KEY_MAINNET = new PublicKey(
  "84aAmYBsJWBZWbsgeBS6MSuFsGUGLAqaofVMLD4DZXtP"
);

const FAUCET_TOKEN_ACCOUNT_PUB_KEY_DEV = new PublicKey(
  "EjQxPWRJPvLFcPj4LomBwCpWxKYuig8jggVFhUq1qYQv"
);
const FAUCET_TOKEN_ACCOUNT_PUB_KEY_MAINNET = new PublicKey(
  "3zztMz1BaGckpyNhrTTRBBgfNpFn9kj4VzkyCGCxHnWB"
);

export const FAUCET_DATA_PUB_KEY =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? FAUCET_DATA_PUB_KEY_MAINNET
    : FAUCET_DATA_PUB_KEY_DEV;

export const FAUCET_TOKEN_ACCOUNT_PUB_KEY =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? FAUCET_TOKEN_ACCOUNT_PUB_KEY_MAINNET
    : FAUCET_TOKEN_ACCOUNT_PUB_KEY_DEV;

// Vault program addresses
export const vaultProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "5R6bVKZfag4X9vW4nek6UNP8XXwH7cPaVohyAo1xfVEU",
  [WalletAdapterNetwork.Devnet]: "CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ",
  [WalletAdapterNetwork.Testnet]:
    "CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ",
};

export const strategyProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "FeMChq4ZCFP8UstbyHnVyme3ATa2vtteLNCwms4jLMAj",
  [WalletAdapterNetwork.Devnet]: "ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE",
  [WalletAdapterNetwork.Testnet]:
    "ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE",
};

export const faucetProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "4rza9AifAapN4SKho3teAuLhc1TPpNWp9DHNPEMzVqgp",
  [WalletAdapterNetwork.Devnet]: "BnjdeSt6reRowzTYp5KQFWXnqBymUe4oNRwjfBW3g5Bu",
  [WalletAdapterNetwork.Testnet]:
    "BnjdeSt6reRowzTYp5KQFWXnqBymUe4oNRwjfBW3g5Bu",
};
