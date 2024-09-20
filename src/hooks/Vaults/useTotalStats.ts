const useTotalStats = (positionsList: any[], positionsLoading: boolean) => {
  return {
    depositsLoading: false,
    withdrawalsLoading: false,
    totalBalance: '100000000000000000000000000000000000000000',
    balanceEarned: '100000000000000000000000000000000000000',
  }
}

export default useTotalStats
