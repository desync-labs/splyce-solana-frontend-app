export const getVaultProgramAddress = (vaultId: string) => {
  if (vaultId === '11111111') {
    return 'CNyqz3mqw6koNmAe7rn2xHGHAS9ftXUNQohwHSiXhJLQ'
  }
  return vaultId
}

export const getStrategyProgramAddress = (strategyId: string) => {
  if (strategyId === 'PB3pu2GFyw8g1LBqPjuF7cU6NuGw2BJcjQac6p9AzjC') {
    return 'ErJGueTn3xVKETP4dc8vrmS5Lu7iupJZ2pr7kYJkCtUE'
  }
  return strategyId
}
