import { memo, useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Box, Paper, styled, Typography } from '@mui/material'
import useVaultContext from '@/context/vaultDetail'
import useSharedContext from '@/context/shared'
import useVaultOpenDeposit from '@/hooks/Vaults/useVaultOpenDeposit'

import DepositVaultForm from '@/components/Vaults/List/DepositVaultModal/DepositVaultForm'
import DepositVaultInfo from '@/components/Vaults/Detail/Forms/DepositVaultInfo'
import { CustomSkeleton } from '@/components/Base/Skeletons/StyledSkeleton'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'

const VaultFormWrapper = styled(FlexBox)`
  align-items: stretch;
  gap: 20px;
  padding-top: 12px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    padding-top: 10px;
  }
`

const VaultDetailFormColumn = styled(Box)`
  width: 50%;
  height: 100%;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`

const VaultDepositPaper = styled(Paper)`
  margin-top: 12px;
  padding: 16px 24px 24px;
`

const VaultDetailDepositForm = () => {
  const [notLoading, setNotLoaded] = useState(false)

  const { vault, vaultPosition, vaultLoading, vaultPositionLoading } =
    useVaultContext()
  const { isMobile } = useSharedContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotLoaded(vaultPosition && !vaultPositionLoading && !vaultLoading)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [vaultPosition, vaultPositionLoading, vaultLoading, setNotLoaded])

  const onClose = () => {
    methods.reset()
  }

  const {
    methods,
    walletBalance,
    isWalletFetching,
    control,
    deposit,
    sharedToken,
    approveBtn,
    approvalPending,
    openDepositLoading,
    errors,
    approve,
    setMax,
    validateMaxDepositValue,
    minimumDeposit,
    depositLimitExceeded,
    handleSubmit,
    onSubmit,
  } = useVaultOpenDeposit(vault, onClose)

  if (!notLoading) {
    return (
      <VaultDepositPaper>
        <Typography variant="h3" sx={{ fontSize: isMobile ? '14px' : '16px' }}>
          Deposit
        </Typography>
        <VaultFormWrapper>
          <CustomSkeleton
            variant="rounded"
            width={'100%'}
            height={isMobile ? 200 : 222}
            animation={'wave'}
          />
          <CustomSkeleton
            variant="rounded"
            width={'100%'}
            height={isMobile ? 211 : 222}
            animation={'wave'}
          />
        </VaultFormWrapper>
      </VaultDepositPaper>
    )
  }

  return (
    <VaultDepositPaper>
      <Typography variant="h3" sx={{ fontSize: isMobile ? '14px' : '16px' }}>
        Deposit
      </Typography>
      <VaultFormWrapper>
        <FormProvider {...methods}>
          <VaultDetailFormColumn>
            <DepositVaultForm
              vaultItemData={vault}
              walletBalance={walletBalance}
              control={control}
              setMax={setMax}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              validateMaxDepositValue={validateMaxDepositValue}
              minimumDeposit={minimumDeposit}
              depositLimitExceeded={depositLimitExceeded}
              isDetailPage={true}
            />
          </VaultDetailFormColumn>
          <DepositVaultInfo
            vaultItemData={vault}
            deposit={deposit}
            sharedToken={sharedToken}
            isWalletFetching={isWalletFetching}
            walletBalance={walletBalance}
            onClose={onClose}
            openDepositLoading={openDepositLoading}
            errors={errors}
            approveBtn={approveBtn}
            approve={approve}
            approvalPending={approvalPending}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </FormProvider>
      </VaultFormWrapper>
    </VaultDepositPaper>
  )
}

export default memo(VaultDetailDepositForm)
