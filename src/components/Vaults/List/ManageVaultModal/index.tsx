import { FC, memo } from 'react'
import { FormProvider } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Typography,
} from '@mui/material'
import BigNumber from 'bignumber.js'

import useVaultManageDeposit, {
  FormType,
} from '@/hooks/Vaults/useVaultManageDeposit'

import ManageVaultForm from '@/components/Vaults/List/ManageVaultModal/ManageVaultForm'
import ManageVaultInfo from '@/components/Vaults/List/ManageVaultModal/ManageVaultInfo'
import VaultModalLockingBar from '@/components/Vaults/List/DepositVaultModal/VaultModalLockingBar'
import {
  BaseDialogButtonWrapper,
  BaseDialogNavItem,
  BaseDialogNavWrapper,
  BaseDialogWrapper,
} from '@/components/Base/Dialog/StyledDialog'
import {
  BaseErrorBox,
  BaseInfoBox,
  BaseWarningBox,
} from '@/components/Base/Boxes/StyledBoxes'
import { IVault, IVaultPosition } from '@/utils/TempData'
import { BaseDialogTitle } from '@/components/Base/Dialog/BaseDialogTitle'
import { useWallet } from '@solana/wallet-adapter-react'
import WalletConnectBtn from '@/components/Base/WalletConnectBtn'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'

export type VaultManageProps = {
  vaultItemData: IVault
  vaultPosition: IVaultPosition
  performanceFee: number
  isTfVaultType: boolean
  activeTfPeriod: number
  onClose: () => void
}

const VaultListItemManageModal: FC<VaultManageProps> = ({
  vaultItemData,
  vaultPosition,
  performanceFee,
  isTfVaultType,
  activeTfPeriod,
  onClose,
}) => {
  const {
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
  } = useVaultManageDeposit(vaultItemData, vaultPosition, onClose)

  const { connected } = useWallet()
  const shutdown = !!vaultItemData.id === '3'
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
      data-testid="vault-listItemManageModal"
    >
      <BaseDialogTitle
        id="customized-dialog-title"
        onClose={onClose}
        sx={{ padding: '24px' }}
        sxCloseIcon={{ right: '16px', top: '16px' }}
        data-testid="vault-listItemManageModal-dialogTitle"
      >
        {shutdown ? (
          'Withdrawing'
        ) : (
          <BaseDialogNavWrapper>
            <BaseDialogNavItem
              onClick={() => setFormType(FormType.DEPOSIT)}
              className={formType === FormType.DEPOSIT ? 'active' : ''}
              data-testid="vault-listItemManageModal-depositNavItem"
            >
              Deposit
            </BaseDialogNavItem>
            <BaseDialogNavItem
              onClick={() => setFormType(FormType.WITHDRAW)}
              className={formType === FormType.WITHDRAW ? 'active' : ''}
              data-testid="vault-listItemManageModal-withdrawNavItem"
            >
              Withdraw
            </BaseDialogNavItem>
          </BaseDialogNavWrapper>
        )}
      </BaseDialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <Box>
            {/*{isTfVaultType && (*/}
            {/*  <VaultModalLockingBar*/}
            {/*    tfVaultLockEndDate={tfVaultLockEndDate}*/}
            {/*    tfVaultDepositEndDate={tfVaultDepositEndDate}*/}
            {/*    activeTfPeriod={activeTfPeriod}*/}
            {/*  />*/}
            {/*)}*/}

            <ManageVaultForm
              balanceToken={balancePosition}
              vaultItemData={vaultItemData}
              vaultPosition={vaultPosition}
              walletBalance={walletBalance}
              control={control}
              formType={formType}
              setMax={setMax}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
            <ManageVaultInfo
              formType={formType}
              vaultItemData={vaultItemData}
              vaultPosition={vaultPosition}
              formToken={formToken}
              formSharedToken={formSharedToken}
              performanceFee={performanceFee}
            />

            <BaseErrorBox sx={{ marginBottom: 0 }}>
              <BaseInfoIcon />
              <Typography>Wallet balance is not enough to deposit.</Typography>
            </BaseErrorBox>
            {formType === FormType.WITHDRAW && (
              <BaseErrorBox sx={{ marginBottom: 0 }}>
                <BaseInfoIcon />
                <Typography>withdrawLimitExceeded</Typography>
              </BaseErrorBox>
            )}
            {activeTfPeriod === 1 && (
              <BaseWarningBox>
                <BaseInfoIcon
                  sx={{ width: '20px', color: '#F5953D', height: '20px' }}
                />
                <Box flexDirection="column">
                  <Typography width="100%">
                    Deposit period has been completed.
                  </Typography>
                </Box>
              </BaseWarningBox>
            )}
            {approveBtn &&
              formType === FormType.DEPOSIT &&
              walletBalance !== '0' && (
                <BaseInfoBox>
                  <BaseInfoIcon />
                  <Box flexDirection="column">
                    <Typography width="100%">
                      First-time connect? Please allow token approval in your
                      MetaMask
                    </Typography>
                  </Box>
                </BaseInfoBox>
              )}
          </Box>
          <BaseDialogButtonWrapper>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            {!connected ? (
              <WalletConnectBtn />
            ) : approveBtn &&
              formType === FormType.DEPOSIT &&
              walletBalance !== '0' ? (
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
                ) : formType === FormType.DEPOSIT ? (
                  'Deposit'
                ) : (
                  'Withdraw'
                )}
              </Button>
            )}
          </BaseDialogButtonWrapper>
        </FormProvider>
      </DialogContent>
    </BaseDialogWrapper>
  )
}

export default memo(VaultListItemManageModal)
