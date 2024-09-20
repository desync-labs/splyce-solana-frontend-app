import { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import {
  getDefaultVaultTitle,
  vaultTitle,
} from '@/utils/Vaults/getVaultTitleAndDescription'
import { getVaultLockEndDate } from '@/utils/Vaults/getVaultLockEndDate'
import {
  dummyVaultMethods,
  IVault,
  IVaultPosition,
  TestVault,
} from '@/utils/TempData'
import { useRouter } from 'next/router'

export enum VaultInfoTabs {
  ABOUT = 'about',
  STRATEGIES = 'strategies',
  MANAGEMENT_VAULT = 'management-vault',
  MANAGEMENT_STRATEGY = 'management-strategy',
}

export type IVaultStrategyHistoricalApr = {
  id: string
  apr: string
  timestamp: string
}

const useVaultDetail = () => {
  const router = useRouter()
  const { vaultId, tab } = router.query
  const [vault, setVault] = useState<IVault>(TestVault as IVault)
  const [vaultLoading, setVaultLoading] = useState<boolean>(false)
  const [vaultPosition, setVaultPosition] = useState<IVaultPosition>(
    {} as IVaultPosition
  )
  const [balanceToken, setBalanceToken] = useState<string>('0')

  const [depositsList, setDepositsList] = useState([])
  const [withdrawalsList, setWithdrawalsList] = useState([])

  const [protocolFee, setProtocolFee] = useState(0)
  const [performanceFee, setPerformanceFee] = useState(0)

  const [minimumDeposit, setMinimumDeposit] = useState<number>(0.0000000001)

  const [updateVaultPositionLoading, setUpdateVaultPositionLoading] =
    useState<boolean>(false)
  const [fetchBalanceLoading, setFetchBalanceLoading] = useState<boolean>(false)

  const [reports, setReports] = useState<
    Record<string, IVaultStrategyReport[]>
  >({})
  const [isReportsLoaded, setIsReportsLoaded] = useState<boolean>(false)

  const [historicalApr, setHistoricalApr] = useState<
    Record<string, IVaultStrategyHistoricalApr[]>
  >({})

  const [managedStrategiesIds, setManagedStrategiesIds] = useState<string[]>([
    '0x989a19e29cb9bc194bd35606af8f9a641a4cbce4',
    '0x4e2fc8a4e62cf515ee7954fd01346cd2501e7e81',
  ])
  const [isUserManager, setIsUserManager] = useState<boolean>(true)

  const [isTfVaultType, setIsTfVaultType] = useState<boolean>(false)
  const [isUserKycPassed, setIsUserKycPassed] = useState<boolean>(false)
  const [tfVaultDepositEndDate, setTfVaultDepositEndDate] = useState<
    string | null
  >(null)
  const [tfVaultLockEndDate, setTfVaultLockEndDate] = useState<string | null>(
    null
  )

  const [tfVaultDepositEndTimeLoading, setTfVaultDepositEndTimeLoading] =
    useState<boolean>(false)
  const [tfVaultLockEndTimeLoading, setTfVaultLockEndTimeLoading] =
    useState<boolean>(false)

  const [activeTfPeriod, setActiveTfPeriod] = useState<number>(1)
  const [tfVaultDepositLimit, setTfVaultDepositLimit] = useState<string>('0')

  const [activeVaultInfoTab, setActiveVaultInfoTab] = useState<VaultInfoTabs>(
    VaultInfoTabs.ABOUT
  )

  const [vaultMethods, setVaultMethods] = useState<any[]>(dummyVaultMethods)
  const [strategyMethods, setStrategyMethods] =
    useState<any[]>(dummyVaultMethods)
  const [isWithdrawAllLoading, setIsWithdrawAllLoading] =
    useState<boolean>(false)
  const [isShowWithdrawAllButtonLoading, setIsShowWithdrawAllButtonLoading] =
    useState<boolean>(true)

  useEffect(() => {
    if (vaultId === '2') {
      setIsTfVaultType(true)
    } else {
      setIsTfVaultType(false)
    }
  }, [vaultId])

  useEffect(() => {
    setProtocolFee(10)
    setPerformanceFee(2)
  }, [])

  useEffect(() => {
    if (tab) {
      setActiveVaultInfoTab(tab as VaultInfoTabs)
    }
  }, [tab])

  const setActiveVaultInfoTabHandler = useCallback(
    (value: VaultInfoTabs) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, tab: value },
        },
        undefined,
        { shallow: true }
      )

      setActiveVaultInfoTab(value)
    },
    [router, vaultId]
  )

  useEffect(() => {
    if (!vaultId) {
      router.push('/vaults')
    }
  }, [vaultId])

  useEffect(() => {
    if (!tfVaultDepositEndDate || !tfVaultLockEndDate) return
    const now = dayjs()
    let activePeriod = 2

    if (now.isBefore(dayjs.unix(Number(tfVaultLockEndDate)))) {
      activePeriod = 1
    }

    if (now.isBefore(dayjs.unix(Number(tfVaultDepositEndDate)))) {
      activePeriod = 0
    }

    setActiveTfPeriod(activePeriod)
  }, [tfVaultDepositEndDate, tfVaultLockEndDate, setActiveTfPeriod])

  const showWithdrawAllButton = useMemo(() => {
    if (isShowWithdrawAllButtonLoading) {
      return false
    }
    return vaultId === '2'
  }, [isShowWithdrawAllButtonLoading, vaultId])

  const handleWithdrawAll = useCallback(async () => {
    alert('handleWithdrawAll')
  }, [vaultPosition])

  const balanceEarned = 100

  return {
    vault,
    vaultLoading,
    vaultPosition,
    reports,
    historicalApr,
    balanceEarned,
    balanceToken,
    protocolFee,
    performanceFee,
    activeVaultInfoTab,
    vaultMethods,
    strategyMethods,
    setActiveVaultInfoTab,
    managedStrategiesIds,
    isUserManager,
    updateVaultPositionLoading,
    isReportsLoaded,
    isUserKycPassed,
    isTfVaultType,
    tfVaultDepositLimit,
    tfVaultDepositEndDate,
    tfVaultLockEndDate,
    activeTfPeriod,
    minimumDeposit,
    setMinimumDeposit,
    isWithdrawAllLoading,
    handleWithdrawAll,
    tfVaultDepositEndTimeLoading,
    tfVaultLockEndTimeLoading,
    showWithdrawAllButton,
    isShowWithdrawAllButtonLoading,
    setActiveVaultInfoTabHandler,
  }
}

export default useVaultDetail
