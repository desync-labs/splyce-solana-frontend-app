import { FC, memo, useMemo, useState } from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { TableCell } from '@mui/material'

import { getTokenLogoURL } from '@/utils/tokenLogo'
import { formatCurrency } from '@/utils/format'
import { IVault, IVaultPosition } from '@/utils/TempData'

import { BaseTableRow } from '@/components/Base/Table/StyledTable'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import VaultListItemPreviewModal from '@/components/Vaults/List/VaultListItemPreviewModal'
import VaultListItemDepositModal from '@/components/Vaults/List/DepositVaultModal'
import VaultListItemManageModal from '@/components/Vaults/List/ManageVaultModal'
// import VaultListItemPreviewModal from 'components/Vaults/List/VaultListItemPreviewModal'
// import VaultListItemDepositModal from 'components/Vaults/List/VaultListItemDepositModal'
// import VaultListItemManageModal from 'components/Vaults/List/VaultListItemManageModal'

export const VaultItemTableRow = styled(BaseTableRow)`
  width: 100%;
  background: #314156;

  & td {
    height: 52px;
  }

  & td:first-of-type {
    padding-left: 16px;
  }
  & td:last-of-type {
    padding-right: 16px;
  }

  &:active {
    background: #3a4f6a;
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
  background: #476182;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
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
  const [newVaultDeposit, setNewVaultDeposit] = useState<boolean>(false)
  const [manageVault, setManageVault] = useState<boolean>(false)

  const handleOpenPreviewModal = () => {
    setIsOpenPreviewModal(true)
  }
  const handleClosePreviewModal = () => {
    setIsOpenPreviewModal(false)
  }

  const handleWithdrawAll = () => {
    alert('withdraw all')
  }

  return (
    <>
      <VaultItemTableRow onClick={handleOpenPreviewModal}>
        <TableCell colSpan={2}>
          <FlexBox sx={{ justifyContent: 'flex-start', gap: '4px' }}>
            <VaultListItemImageWrapper>
              <Image src={getTokenLogoURL(token.id)} alt={token.name} />
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
      {useMemo(() => {
        return (
          <VaultListItemPreviewModal
            isOpenPreviewModal={isOpenPreviewModal}
            vault={vaultItemData}
            vaultPosition={vaultPosition as IVaultPosition}
            handleClosePreview={handleClosePreviewModal}
            setManageVault={setManageVault}
            setNewVaultDeposit={setNewVaultDeposit}
            handleWithdrawAll={handleWithdrawAll}
            isTfVaultType={false}
            activeTfPeriod={0}
            isWithdrawLoading={false}
          />
        )
      }, [
        isOpenPreviewModal,
        vaultItemData,
        vaultPosition,
        setManageVault,
        setNewVaultDeposit,
      ])}

      {useMemo(() => {
        return (
          newVaultDeposit && (
            <VaultListItemDepositModal
              vaultItemData={vaultItemData}
              isTfVaultType={false}
              activeTfPeriod={0}
              onClose={() => setNewVaultDeposit(false)}
            />
          )
        )
      }, [newVaultDeposit, setNewVaultDeposit])}
      {useMemo(() => {
        return (
          manageVault &&
          vaultPosition && (
            <VaultListItemManageModal
              vaultItemData={vaultItemData}
              vaultPosition={vaultPosition}
              performanceFee={performanceFee}
              isTfVaultType={false}
              activeTfPeriod={0}
              onClose={() => setManageVault(false)}
            />
          )
        )
      }, [manageVault, setManageVault])}
    </>
  )
}

export default memo(VaultListItemMobile)
