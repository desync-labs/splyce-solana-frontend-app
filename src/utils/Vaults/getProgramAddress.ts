export const getVaultProgramAddress = (vaultId: string) => {
  const vaultIdLower = vaultId.toLowerCase()
  if (vaultIdLower === '11111111'.toLowerCase()) {
    return 'CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ'
  }
  if (vaultIdLower === 'Ahg1opVcGX'.toLowerCase()) {
    return 'CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ'
  }
  if (vaultIdLower === 'LQM2cdzDY3'.toLowerCase()) {
    return 'CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ'
  }

  return vaultId
}

export const getStrategyProgramAddress = (strategyId: string) => {
  const strategyIdLower = strategyId.toLowerCase()
  if (strategyIdLower === 'PB3pu2GFyw8g1LBqPjuF7cU6NuGw2BJcjQac6p9AzjC') {
    return 'ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE'
  }
  return strategyId
}
