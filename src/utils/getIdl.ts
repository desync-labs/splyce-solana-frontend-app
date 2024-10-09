import { Idl } from "@coral-xyz/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { defaultNetWork } from "@/utils/network";

import vaultIdl from "@/idls/tokenized_vault.json";
import strategyIdl from "@/idls/strategy_program.json";
import faucetIdl from "@/idls/faucet.json";

export enum IdlTypes {
  VAULT = "Vault",
  STRATEGY = "Strategy",
  FAUCET = "Faucet",
}

export const getIdl = (typeIdl: IdlTypes): Idl => {
  switch (typeIdl) {
    case IdlTypes.VAULT:
      return { ...vaultIdl, address: vaultProgramIds[defaultNetWork] };
    case IdlTypes.STRATEGY:
      return { ...strategyIdl, address: strategyProgramIds[defaultNetWork] };
    case IdlTypes.FAUCET:
      return { ...faucetIdl, address: faucetProgramIds[defaultNetWork] };
  }
};

const vaultProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "5R6bVKZfag4X9vW4nek6UNP8XXwH7cPaVohyAo1xfVEU",
  [WalletAdapterNetwork.Devnet]: "CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ",
  [WalletAdapterNetwork.Testnet]:
    "CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ",
};

const strategyProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "FeMChq4ZCFP8UstbyHnVyme3ATa2vtteLNCwms4jLMAj",
  [WalletAdapterNetwork.Devnet]: "ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE",
  [WalletAdapterNetwork.Testnet]:
    "ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE",
};

const faucetProgramIds = {
  [WalletAdapterNetwork.Mainnet]:
    "4rza9AifAapN4SKho3teAuLhc1TPpNWp9DHNPEMzVqgp",
  [WalletAdapterNetwork.Devnet]: "BnjdeSt6reRowzTYp5KQFWXnqBymUe4oNRwjfBW3g5Bu",
  [WalletAdapterNetwork.Testnet]:
    "BnjdeSt6reRowzTYp5KQFWXnqBymUe4oNRwjfBW3g5Bu",
};
