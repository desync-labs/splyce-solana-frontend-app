import { FC, memo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { TableCell } from '@mui/material'
import BigNumber from 'bignumber.js'
import { getTokenLogoURL } from 'utils/tokenLogo'
import { formatCurrency } from 'utils/format'
import { BaseTableRow } from '@/components/Base/Table/StyledTable'
import { IVault } from '@/utils/TempData'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
// import VaultListItemPreviewModal from 'components/Vaults/List/VaultListItemPreviewModal'
// import VaultListItemDepositModal from 'components/Vaults/List/VaultListItemDepositModal'
// import VaultListItemManageModal from 'components/Vaults/List/VaultListItemManageModal'

export const VaultItemTableRow = styled(BaseTableRow)`
  width: 100%;
  border-radius: 8px;
  background: #132340;

  & td {
    height: 52px;
  }

  & td:first-of-type {
    padding-left: 16px;
  }

  &:active {
    background: #2c4066;
  }
`

export const VaultTitle = styled('div')`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`

export const VaultApr = styled('div')`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`

export const VaultStackedLiquidity = styled('div')`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`

export const VaultTagLabel = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: fit-content;
  background: rgba(79, 101, 140, 0.3);
  font-size: 11px;
  font-weight: 600;
  color: #43fff1;
  border-radius: 6px;
  padding: 4px 8px;
`

export const VaultListItemImageWrapper = styled('div')`
  display: flex;
  justify-content: left;

  img {
    border-radius: 50%;
    width: 18px;
    height: 18px;
  }
`

type VaultListItemMobileProps = {
  vaultItemData: IVault
}

const VaultListItemMobile: FC<VaultListItemMobileProps> = ({
  vaultItemData,
  vaultPosition,
  performanceFee,
}) => {
  const { token } = vaultItemData

  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState<boolean>(false)

  const handleOpenPreviewModal = () => {
    setIsOpenPreviewModal(true)
  }
  const handleClosePreviewModal = () => {
    setIsOpenPreviewModal(false)
  }

  return (
    <>
      <VaultItemTableRow onClick={handleOpenPreviewModal}>
        <TableCell colSpan={2}>
          <FlexBox sx={{ justifyContent: 'flex-start', gap: '4px' }}>
            <VaultListItemImageWrapper>
              <img src={getTokenLogoURL(token.id)} alt={token.name} />
            </VaultListItemImageWrapper>
            <VaultTitle>{vaultItemData.name}</VaultTitle>
          </FlexBox>
        </TableCell>
        <TableCell colSpan={1}>
          <VaultApr>10 %</VaultApr>
        </TableCell>
        <TableCell colSpan={2}>
          <VaultStackedLiquidity>{formatCurrency(10000)}</VaultStackedLiquidity>
        </TableCell>
        <TableCell colSpan={1}>
          <VaultTagLabel>Live</VaultTagLabel>
        </TableCell>
      </VaultItemTableRow>
      {/*{useMemo(() => {*/}
      {/*  return (*/}
      {/*    <VaultListItemPreviewModal*/}
      {/*      isOpenPreviewModal={isOpenPreviewModal}*/}
      {/*      vault={vaultItemData}*/}
      {/*      vaultPosition={vaultPosition as IVaultPosition}*/}
      {/*      balanceEarned={balanceEarned}*/}
      {/*      handleClosePreview={handleClosePreviewModal}*/}
      {/*      setManageVault={setManageVault}*/}
      {/*      setNewVaultDeposit={setNewVaultDeposit}*/}
      {/*      tfVaultDepositLimit={tfVaultDepositLimit}*/}
      {/*      handleWithdrawAll={handleWithdrawAll}*/}
      {/*      isTfVaultType={isTfVaultType}*/}
      {/*      activeTfPeriod={activeTfPeriod}*/}
      {/*      isWithdrawLoading={isWithdrawLoading}*/}
      {/*    />*/}
      {/*  )*/}
      {/*}, [*/}
      {/*  isOpenPreviewModal,*/}
      {/*  vaultItemData,*/}
      {/*  vaultPosition,*/}
      {/*  balanceEarned,*/}
      {/*  setManageVault,*/}
      {/*  setNewVaultDeposit,*/}
      {/*])}*/}

      {/*{useMemo(() => {*/}
      {/*  return (*/}
      {/*    newVaultDeposit && (*/}
      {/*      <VaultListItemDepositModal*/}
      {/*        vaultItemData={vaultItemData}*/}
      {/*        performanceFee={performanceFee}*/}
      {/*        isTfVaultType={isTfVaultType}*/}
      {/*        isUserKycPassed={isUserKycPassed}*/}
      {/*        tfVaultDepositEndDate={tfVaultDepositEndDate}*/}
      {/*        tfVaultLockEndDate={tfVaultLockEndDate}*/}
      {/*        activeTfPeriod={activeTfPeriod}*/}
      {/*        minimumDeposit={minimumDeposit}*/}
      {/*        onClose={() => setNewVaultDeposit(false)}*/}
      {/*      />*/}
      {/*    )*/}
      {/*  )*/}
      {/*}, [newVaultDeposit, setNewVaultDeposit])}*/}
      {/*{useMemo(() => {*/}
      {/*  return (*/}
      {/*    manageVault &&*/}
      {/*    vaultPosition && (*/}
      {/*      <VaultListItemManageModal*/}
      {/*        vaultItemData={vaultItemData}*/}
      {/*        vaultPosition={vaultPosition}*/}
      {/*        performanceFee={performanceFee}*/}
      {/*        isTfVaultType={isTfVaultType}*/}
      {/*        tfVaultDepositEndDate={tfVaultDepositEndDate}*/}
      {/*        tfVaultLockEndDate={tfVaultLockEndDate}*/}
      {/*        activeTfPeriod={activeTfPeriod}*/}
      {/*        minimumDeposit={minimumDeposit}*/}
      {/*        onClose={() => setManageVault(false)}*/}
      {/*      />*/}
      {/*    )*/}
      {/*  )*/}
      {/*}, [manageVault, setManageVault])}*/}
    </>
  )
}

export default memo(VaultListItemMobile)
