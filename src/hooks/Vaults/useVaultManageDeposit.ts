import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IVault, IVaultPosition } from '@/utils/TempData'

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
  const { balancePosition, balanceShares } = vaultPosition

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

  const { depositLimit, balanceTokens } = vault
  const [formType, setFormType] = useState<FormType>(
    vault.id === '3' ? FormType.WITHDRAW : FormType.DEPOSIT
  )
  const [walletBalance, setWalletBalance] = useState<string>('111')

  const [isFullWithdraw, setIsFullWithdraw] = useState<boolean>(false)

  const formToken = watch('formToken')
  const formSharedToken = watch('formSharedToken')

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
      if (formType === FormType.DEPOSIT) {
        alert(`Deposit token ${formToken}`)
      } else {
        alert(`Withdraw token ${formSharedToken}`)
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
    balancePosition,
    setMax,
    handleSubmit,
    onSubmit,
    methods,
  }
}

export default useVaultManageDeposit
