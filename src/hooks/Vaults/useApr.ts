import { formatNumber } from 'utils/format'
import { ApyConfig } from 'utils/Vaults/getApyConfig'
import { IVault } from '@/utils/TempData'

const useApr = (vault: IVault) => {
  if (ApyConfig[vault.id]) {
    return formatNumber(ApyConfig[vault.id])
  }

  return formatNumber(Number(vault.apr))
}

const useAprNumber = (vault: IVault) => {
  if (ApyConfig[vault.id]) {
    return ApyConfig[vault.id]
  }

  return Number(vault.apr)
}

const getApr = (currentDept: string, apr: string, vaultId: string) => {
  if (ApyConfig[vaultId]) {
    return ApyConfig[vaultId].toString()
  }

  return apr
}

export { useApr, useAprNumber, getApr }
