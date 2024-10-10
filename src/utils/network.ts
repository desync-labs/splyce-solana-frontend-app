import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const defaultNetWork =
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;

const MAINNET_RPC =
  "https://mainnet.helius-rpc.com/?api-key=d3db5333-b3a6-4684-b4be-c3b8eef030ce";
const DEV_RPC = "https://rpc.solana.splyce.finance";

export const defaultEndpoint =
  process.env.NEXT_PUBLIC_ENV === "prod" ? MAINNET_RPC : DEV_RPC;

export const SUBGRAPH_URLS = {
  [WalletAdapterNetwork.Mainnet]:
    "https://api.studio.thegraph.com/query/90915/splyce-vault-subgraph/version/latest",
  [WalletAdapterNetwork.Devnet]: "https://graph.solana.splyce.finance",
  [WalletAdapterNetwork.Testnet]: "https://graph.solana.splyce.finance",
};

export const VAULTS_SUBGRAPH_URL_PROD =
  "https://gateway.thegraph.com/api/738f549a8239061dfa1ddb2e0d44fe5e/subgraphs/id/2nrSQVSkTxp5orhEYfCAwiJai6Gnm72WTzraXLAqwewK";
