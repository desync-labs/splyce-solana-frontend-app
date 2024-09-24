import { FC, memo } from 'react'
import { FormProvider } from 'react-hook-form'
import { useWallet } from '@solana/wallet-adapter-react'
import { Box, Button, CircularProgress, DialogContent } from '@mui/material'

import useVaultOpenDeposit from '@/hooks/Vaults/useVaultOpenDeposit'
import { IVault } from '@/utils/TempData'

import DepositVaultInfo from '@/components/Vaults/List/DepositVaultModal/DepositVaultInfo'
import DepositVaultForm from '@/components/Vaults/List/DepositVaultModal/DepositVaultForm'
import {
  BaseDialogButtonWrapper,
  BaseDialogWrapper,
} from '@/components/Base/Dialog/StyledDialog'
import { BaseDialogTitle } from '@/components/Base/Dialog/BaseDialogTitle'
import WalletConnectBtn from '@/components/Base/WalletConnectBtn'
import {
  BaseInfoBox,
  BaseWarningBox,
  BaseErrorBox,
} from '@/components/Base/Boxes/StyledBoxes'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'

export type VaultDepositProps = {
  vaultItemData: IVault
  isTfVaultType: boolean
  activeTfPeriod: number
  onClose: () => void
}

const VaultListItemDepositModal: FC<VaultDepositProps> = ({
  vaultItemData,
  isTfVaultType,
  activeTfPeriod,
  onClose,
}) => {
  const {
    methods,
    control,
    deposit,
    sharedToken,
    setMax,
    handleSubmit,
    onSubmit,
  } = useVaultOpenDeposit(vaultItemData, onClose)

  const { connected } = useWallet()

  const openDepositLoading = false
  const approveBtn = true
  const approvalPending = false
  const walletBalance = '0'

  const approve = () => {
    alert('Approve token')
  }

  return (
    <BaseDialogWrapper
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth
      maxWidth="sm"
      data-testid="vault-listItemDepositModal"
    >
      <BaseDialogTitle
        id="customized-dialog-title"
        onClose={onClose}
        sx={{ padding: '24px !important' }}
        sxCloseIcon={{ right: '16px', top: '16px' }}
      >
        Deposit
      </BaseDialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <Box>
            {/*{isTfVaultType && (*/}
            {/*  <VaultModalLockingBar*/}
            {/*    tfVaultLockEndDate={'2022-12-31T00:00:00Z'}*/}
            {/*    tfVaultDepositEndDate={'2022-12-31T00:00:00Z'}*/}
            {/*    activeTfPeriod={1}*/}
            {/*  />*/}
            {/*)}*/}
            <DepositVaultForm
              vaultItemData={vaultItemData}
              control={control}
              setMax={setMax}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
            <DepositVaultInfo
              vaultItemData={vaultItemData}
              deposit={deposit}
              sharedToken={sharedToken}
              performanceFee={8}
            />
            {/*<BaseErrorBox sx={{ marginBottom: 0 }}>*/}
            {/*  <BaseInfoIcon />*/}
            {/*  <Typography>Wallet balance is not enough to deposit.</Typography>*/}
            {/*</BaseErrorBox>*/}
            {/*{activeTfPeriod === 1 && (*/}
            {/*  <BaseWarningBox>*/}
            {/*    <BaseInfoIcon*/}
            {/*      sx={{ width: '20px', color: '#F5953D', height: '20px' }}*/}
            {/*    />*/}
            {/*    <Box flexDirection="column">*/}
            {/*      <Typography width="100%">*/}
            {/*        Deposit period has been completed.*/}
            {/*      </Typography>*/}
            {/*    </Box>*/}
            {/*  </BaseWarningBox>*/}
            {/*)}*/}
            {/*<BaseInfoBox>*/}
            {/*  <BaseInfoIcon />*/}
            {/*  <Box flexDirection="column">*/}
            {/*    <Typography width="100%">*/}
            {/*      First-time connect? Please allow token approval in your*/}
            {/*      MetaMask*/}
            {/*    </Typography>*/}
            {/*  </Box>*/}
            {/*</BaseInfoBox>*/}
          </Box>
          <BaseDialogButtonWrapper>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            {!connected ? (
              <WalletConnectBtn />
            ) : approveBtn && walletBalance !== '0' ? (
              <Button variant="gradient" onClick={approve}>
                {' '}
                {approvalPending ? (
                  <CircularProgress size={20} sx={{ color: '#183102' }} />
                ) : (
                  'Approve token'
                )}{' '}
              </Button>
            ) : (
              <Button variant="gradient" onClick={handleSubmit(onSubmit)}>
                {openDepositLoading ? (
                  <CircularProgress sx={{ color: '#183102' }} size={20} />
                ) : (
                  'Deposit'
                )}
              </Button>
            )}
          </BaseDialogButtonWrapper>
        </FormProvider>
      </DialogContent>
    </BaseDialogWrapper>
  )
}

export default memo(VaultListItemDepositModal)
