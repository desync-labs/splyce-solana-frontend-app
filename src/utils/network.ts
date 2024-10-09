import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

export const defaultNetWork = WalletAdapterNetwork.Devnet // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
//export const defaultEndpoint = clusterApiUrl(defaultNetWork) // You can also provide a custom RPC endpoint
export const defaultEndpoint = "https://rpc.solana.splyce.finance"
//export const defaultEndpoint = 'http://34.42.12.83:8899'

export const SUBGRAPH_URLS = {
  // [WalletAdapterNetwork.Mainnet]: 'http://34.42.12.83:8000',
  // [WalletAdapterNetwork.Testnet]: 'http://34.42.12.83:8000',
  // [WalletAdapterNetwork.Devnet]: 'http://34.42.12.83:8000',
  [WalletAdapterNetwork.Mainnet]: "https://graph.solana.splyce.finance",
  [WalletAdapterNetwork.Testnet]: "https://graph.solana.splyce.finance",
  [WalletAdapterNetwork.Devnet]: "https://graph.solana.splyce.finance",
}
