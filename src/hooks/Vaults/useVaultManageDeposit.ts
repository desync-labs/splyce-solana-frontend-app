import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { IVault, IVaultPosition } from '@/utils/TempData'
import {
  depositTokens,
  getUserTokenBalance,
  withdrawTokens,
} from '@/utils/TempSdkMethods'

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
  onClose: () => void
) => {
  const { depositLimit, balanceTokens, token, shareToken } = vault
  const { balancePosition, balanceShares } = vaultPosition
  const { publicKey, wallet } = useWallet()

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
    vault.id === '3' ? FormType.WITHDRAW : FormType.DEPOSIT
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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    timeout = setTimeout(() => {
      getVaultTokenBalance()
    }, 300)

    return () => clearTimeout(timeout)
  }, [publicKey, token?.id, getVaultTokenBalance])

  const setMax = useCallback(() => {
    if (formType === FormType.DEPOSIT) {
      setValue('formToken', 100, {
        shouldValidate: true,
      })
    } else {
      setIsFullWithdraw(true)
      setValue('formToken', 100, { shouldValidate: true })
      setValue('formSharedToken', 101, { shouldValidate: true })
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

  const onSubmit = useCallback(
    async (values: Record<string, any>) => {
      if (!publicKey || !wallet || !token) {
        return
      }
      setOpenDepositLoading(true)

      const { formToken, formSharedToken } = values

      const tokenPublicKey = new PublicKey(token.id)
      const sharedTokenPublicKey = new PublicKey(shareToken.id)

      if (formType === FormType.DEPOSIT) {
        const depositResponse = await depositTokens(
          publicKey,
          formToken,
          wallet,
          tokenPublicKey,
          sharedTokenPublicKey
        )

        console.log('Deposit Response', depositResponse)
      } else {
        const withdrawResponse = await withdrawTokens(
          publicKey,
          formToken,
          wallet,
          tokenPublicKey,
          sharedTokenPublicKey
        )
        alert(`Withdraw response: ${withdrawResponse}`)
      }

      setOpenDepositLoading(false)
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
  }
}

export default useVaultManageDeposit
