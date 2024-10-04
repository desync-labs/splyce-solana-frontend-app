import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import debounce from 'lodash.debounce'
import BigNumber from 'bignumber.js'
import { IVault, IVaultPosition, VaultType } from '@/utils/TempData'
import {
  depositTokens,
  getTransactionBlock,
  getUserTokenBalance,
  previewDeposit,
  previewWithdraw,
  withdrawTokens,
} from '@/utils/TempSdkMethods'
import { formatNumber } from '@/utils/format'
import { MAX_PERSONAL_DEPOSIT } from '@/hooks/Vaults/useVaultOpenDeposit'
import useSyncContext from '@/context/sync'

export const defaultValues = {
  formToken: '',
  formSharedToken: '',
}

export enum FormType {
  DEPOSIT,
  WITHDRAW,
}
const useVaultManageDeposit = (
  vault: IVault,
  vaultPosition: IVaultPosition,
  minimumDeposit: number,
  onClose: () => void
) => {
  const { depositLimit, balanceTokens, token, shareToken, shutdown, type } =
    vault
  const { balancePosition, balanceShares } = vaultPosition
  const { publicKey, wallet } = useWallet()
  const { setLastTransactionBlock } = useSyncContext()

  const methods = useForm({
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods

  const [formType, setFormType] = useState<FormType>(
    shutdown ? FormType.WITHDRAW : FormType.DEPOSIT
  )
  const [walletBalance, setWalletBalance] = useState<string>('0')
  const [isWalletFetching, setIsWalletFetching] = useState<boolean>(false)
  const [openDepositLoading, setOpenDepositLoading] = useState<boolean>(false)
  const [isFullWithdraw, setIsFullWithdraw] = useState<boolean>(false)

  const formToken = watch('formToken')
  const formSharedToken = watch('formSharedToken')

  const getVaultTokenBalance = useCallback(async () => {
    if (!publicKey || !token?.id) {
      return
    }
    const balance = await getUserTokenBalance(publicKey, token.id)
    setWalletBalance(balance)
    setIsWalletFetching(true)
  }, [publicKey, token?.id, setWalletBalance, setIsWalletFetching])

  const updateSharedAmount = useMemo(
    () =>
      debounce(async (deposit: string) => {
        let sharedAmount = '0'

        if (isFullWithdraw) {
          setIsFullWithdraw(false)
          return
        }

        if (formType === FormType.DEPOSIT) {
          sharedAmount = await previewDeposit(deposit, vault.id)
        } else {
          sharedAmount = await previewWithdraw(deposit, vault.id)
        }

        const sharedConverted = BigNumber(sharedAmount).toString()

        setValue('formSharedToken', sharedConverted)
      }, 500),
    [vault.id, formType, isFullWithdraw, setIsFullWithdraw]
  )

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    timeout = setTimeout(() => {
      getVaultTokenBalance()
    }, 300)

    return () => clearTimeout(timeout)
  }, [publicKey, token?.id, getVaultTokenBalance])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (formToken.toString().trim() && BigNumber(formToken).isGreaterThan(0)) {
      updateSharedAmount(formToken)
    } else {
      timeout = setTimeout(() => {
        setValue('formSharedToken', '')
      }, 600)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [formToken, updateSharedAmount, setValue])

  const setMax = useCallback(() => {
    if (formType === FormType.DEPOSIT) {
      if (type === VaultType.TRADEFI) {
        const max = BigNumber.min(walletBalance, depositLimit)
          .dividedBy(10 ** 9)
          .decimalPlaces(6, BigNumber.ROUND_DOWN)

        const maxCapped = max.isNegative() ? BigNumber(0) : max

        setValue('formToken', maxCapped.toString(), {
          shouldValidate: true,
        })
      } else {
        const max = BigNumber.min(
          BigNumber(walletBalance).dividedBy(10 ** 9),
          BigNumber(depositLimit)
            .minus(balanceTokens)
            .dividedBy(10 ** 9),
          BigNumber(MAX_PERSONAL_DEPOSIT).minus(
            BigNumber(balancePosition).dividedBy(10 ** 9)
          )
        ).decimalPlaces(6, BigNumber.ROUND_DOWN)
        console.log('max', max.toString())

        const maxCapped = max.isNegative() ? BigNumber(0) : max

        setValue('formToken', maxCapped.toString(), {
          shouldValidate: true,
        })
      }
    } else {
      setIsFullWithdraw(true)
      setValue(
        'formToken',
        BigNumber(balancePosition)
          .dividedBy(10 ** 9)
          .toString(),
        { shouldValidate: true }
      )
      setValue(
        'formSharedToken',
        BigNumber(balanceShares)
          .dividedBy(10 ** 9)
          .toString(),
        { shouldValidate: true }
      )
    }
  }, [
    setValue,
    setIsFullWithdraw,
    isFullWithdraw,
    walletBalance,
    balancePosition,
    depositLimit,
    balanceTokens,
    formType,
    balanceShares,
  ])

  const withdrawLimitExceeded = (value: string) => {
    /**
     * Logic for TradeFlowVault
     */
    if (type === VaultType.TRADEFI) {
      const maxBalanceToken = BigNumber(balancePosition).dividedBy(10 ** 9)

      if (
        BigNumber(maxBalanceToken).minus(value).isGreaterThan(0) &&
        BigNumber(maxBalanceToken).minus(value).isLessThan(minimumDeposit)
      ) {
        return `After withdraw ${formatNumber(Number(value))} ${
          token.name
        }  you will have ${formatNumber(
          BigNumber(maxBalanceToken).minus(value).toNumber()
        )} ${token.name} less then minimum allowed deposit ${
          minimumDeposit / 1000
        }k ${token.name}, you can do full withdraw instead.`
      }
      return false
    } else {
      return false
    }
  }

  const onSubmit = useCallback(
    async (values: Record<string, any>) => {
      if (!publicKey || !wallet || !token) {
        return
      }
      setOpenDepositLoading(true)

      const { formToken, formSharedToken } = values

      const tokenPublicKey = new PublicKey(token.id)
      const sharedTokenPublicKey = new PublicKey(shareToken.id)
      const formattedAmount = BigNumber(formToken)
        .multipliedBy(10 ** 9)
        .toString()

      if (formType === FormType.DEPOSIT) {
        try {
          depositTokens(
            publicKey,
            formattedAmount,
            wallet,
            tokenPublicKey,
            sharedTokenPublicKey
          )
            .then(async (txSignature) => {
              const txSlot = await getTransactionBlock(txSignature)

              if (txSlot) {
                setLastTransactionBlock(txSlot)
              }
            })
            .finally(() => {
              setOpenDepositLoading(false)
              onClose()
            })
        } catch (error) {
          console.error('Error depositing tokens:', error)
          setOpenDepositLoading(false)
        }
      } else {
        try {
          withdrawTokens(
            publicKey,
            formattedAmount,
            wallet,
            tokenPublicKey,
            sharedTokenPublicKey
          )
            .then(async (txSignature) => {
              const txSlot = await getTransactionBlock(txSignature)

              if (txSlot) {
                setLastTransactionBlock(txSlot)
              }
            })
            .finally(() => {
              setOpenDepositLoading(false)
              onClose()
            })
        } catch (error) {
          console.error('Error withdrawing tokens:', error)
          setOpenDepositLoading(false)
        }
      }
    },
    [formType]
  )

  return {
    control,
    formType,
    formToken,
    formSharedToken,
    errors,
    setFormType,
    walletBalance,
    isWalletFetching,
    openDepositLoading,
    balancePosition,
    setMax,
    handleSubmit,
    onSubmit,
    methods,
    withdrawLimitExceeded,
  }
}

export default useVaultManageDeposit
