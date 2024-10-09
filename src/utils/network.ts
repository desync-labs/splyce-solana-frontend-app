import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const defaultNetWork =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;

const MAINNET_RPC = clusterApiUrl(WalletAdapterNetwork.Mainnet);
const DEV_RPC = "https://rpc.solana.splyce.finance";

export const defaultEndpoint =
  process.env.NEXT_PUBLIC_ENV === "prod" ? MAINNET_RPC : DEV_RPC;

export const SUBGRAPH_URLS = {
  [WalletAdapterNetwork.Mainnet]:
    "https://api.studio.thegraph.com/query/90915/splyce-vault-subgraph/version/latest",
  [WalletAdapterNetwork.Devnet]: "https://graph.solana.splyce.finance",
  [WalletAdapterNetwork.Testnet]: "https://graph.solana.splyce.finance",
};
