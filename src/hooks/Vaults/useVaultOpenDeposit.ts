import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IVault } from '@/utils/TempData'

export const defaultValues = {
  deposit: '',
  sharedToken: '',
}

const useVaultOpenDeposit = (vault: IVault, onClose: () => void) => {
  const methods = useForm({
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods

  const [walletBalance, setWalletBalance] = useState<string>('1111')

  const deposit = watch('deposit')
  const sharedToken = watch('sharedToken')

  const setMax = useCallback(() => {
    setValue('deposit', '100', {
      shouldValidate: true,
    })
  }, [setValue])

  const onSubmit = useCallback(
    async (values: Record<string, any>) => {
      console.log('onSubmit', values)
    },
    [deposit, sharedToken]
  )

  return {
    methods,
    walletBalance,
    control,
    deposit,
    sharedToken,
    errors,
    setMax,
    handleSubmit,
    onSubmit,
  }
}

export default useVaultOpenDeposit
