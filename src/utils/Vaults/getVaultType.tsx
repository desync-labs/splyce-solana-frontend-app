import { VaultType } from '@/utils/TempData'

const vaultType: { [key: string]: VaultType } = {}

vaultType['0xfa6ed4d32110e1c27c9d8c2930e217746cb8acab'.toLowerCase()] =
  VaultType.TRADEFI

export { vaultType }
