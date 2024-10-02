import { FC, memo } from 'react'
import { FormProvider } from 'react-hook-form'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  Typography,
} from '@mui/material'

import useVaultOpenDeposit from '@/hooks/Vaults/useVaultOpenDeposit'
import { IVault } from '@/utils/TempData'

import WalletConnectBtn from '@/components/Base/WalletConnectBtn'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'
import { BaseDialogTitle } from '@/components/Base/Dialog/BaseDialogTitle'
import DepositVaultInfo from '@/components/Vaults/List/DepositVaultModal/DepositVaultInfo'
import DepositVaultForm from '@/components/Vaults/List/DepositVaultModal/DepositVaultForm'
import {
  BaseDialogButtonWrapper,
  BaseDialogWrapper,
} from '@/components/Base/Dialog/StyledDialog'
import {
  BaseInfoBox,
  BaseWarningBox,
  BaseErrorBox,
} from '@/components/Base/Boxes/StyledBoxes'
import VaultModalLockingBar from '@/components/Vaults/List/DepositVaultModal/VaultModalLockingBar'
import BigNumber from 'bignumber.js'

export type VaultDepositProps = {
  vaultItemData: IVault
  performanceFee: number
  isTfVaultType: boolean
  isUserKycPassed: boolean
  tfVaultDepositEndDate: string | null
  tfVaultLockEndDate: string | null
  activeTfPeriod: number
  minimumDeposit: number
  onClose: () => void
}

const VaultListItemDepositModal: FC<VaultDepositProps> = ({
  vaultItemData,
  performanceFee,
  isTfVaultType,
  isUserKycPassed,
  tfVaultDepositEndDate,
  tfVaultLockEndDate,
  activeTfPeriod,
  minimumDeposit,
  onClose,
}) => {
  const {
    methods,
    control,
    deposit,
    sharedToken,
    isWalletFetching,
    errors,
    setMax,
    validateMaxDepositValue,
    depositLimitExceeded,
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
            {isTfVaultType && (
              <VaultModalLockingBar
                tfVaultLockEndDate={tfVaultLockEndDate}
                tfVaultDepositEndDate={tfVaultDepositEndDate}
                activeTfPeriod={activeTfPeriod}
              />
            )}
            <DepositVaultForm
              vaultItemData={vaultItemData}
              walletBalance={walletBalance}
              control={control}
              setMax={setMax}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              validateMaxDepositValue={validateMaxDepositValue}
              minimumDeposit={minimumDeposit}
              depositLimitExceeded={depositLimitExceeded}
            />
            <DepositVaultInfo
              vaultItemData={vaultItemData}
              deposit={deposit}
              sharedToken={sharedToken}
              performanceFee={performanceFee}
            />
            {isWalletFetching &&
              (BigNumber(walletBalance)
                .dividedBy(10 ** 18)
                .isLessThan(BigNumber(deposit)) ||
                walletBalance == '0') && (
                <BaseErrorBox sx={{ marginBottom: 0 }}>
                  <BaseInfoIcon />
                  <Typography>
                    Wallet balance is not enough to deposit.
                  </Typography>
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
            {approveBtn && walletBalance !== '0' && (
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
              <Button
                variant="gradient"
                onClick={handleSubmit(onSubmit)}
                disabled={
                  openDepositLoading ||
                  approveBtn ||
                  !!Object.keys(errors).length ||
                  (isTfVaultType && !isUserKycPassed) ||
                  (isTfVaultType && activeTfPeriod > 0)
                }
              >
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
