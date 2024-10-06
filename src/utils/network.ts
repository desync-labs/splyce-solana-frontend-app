import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'

export const defaultNetWork = WalletAdapterNetwork.Devnet // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
export const defaultEndpoint = 'http://34.42.12.83:8899' // You can also provide a custom RPC endpoint

export const SUBGRAPH_URLS = {
  [WalletAdapterNetwork.Mainnet]: 'https://graph.solana.splyce.finance',
  [WalletAdapterNetwork.Testnet]: 'https://graph.solana.splyce.finance',
  [WalletAdapterNetwork.Devnet]: 'https://graph.solana.splyce.finance',
}
