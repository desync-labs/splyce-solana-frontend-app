import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'

export const defaultNetWork = WalletAdapterNetwork.Devnet // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
export const defaultEndpoint = 'https://rpc.solana.splyce.finance' // You can also provide a custom RPC endpoint

export const SUBGRAPH_URLS = {
  [WalletAdapterNetwork.Mainnet]: 'https://graph.solana.splyce.finance',
  [WalletAdapterNetwork.Testnet]: 'https://graph.solana.splyce.finance',
  [WalletAdapterNetwork.Devnet]: 'https://graph.solana.splyce.finance',
}
