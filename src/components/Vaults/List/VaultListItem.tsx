import { FC, memo, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, TableCell, styled, Button } from '@mui/material'

import { IVault } from '@/utils/TempData'
import { getTokenLogoURL } from '@/utils/tokenLogo'
import { formatCurrency, formatNumber } from '@/utils/format'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import { BaseTableItemRow } from '@/components/Base/Table/StyledTable'
import VaultListItemDepositModal from '@/components/Vaults/List/DepositVaultModal'
import VaultListItemManageModal from '@/components/Vaults/List/ManageVaultModal'

import LockAquaSrc from 'assets/svg/lock-aqua.svg'
import LockSrc from 'assets/svg/lock.svg'

export const VaultTitle = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
`

export const VaultEarned = styled('div')`
  line-height: 20px;
  font-size: 14px;
  color: #fff;
`

export const VaultApr = styled('div')`
  color: #fff;
`

export const VaultStackedLiquidity = styled('div')`
  color: #fff;
`

export const VaultAvailable = styled('div')`
  &.blue {
    color: #6d86b2;
  }
  color: #fff;
  word-break: break-word;
`

export const VaultStacked = styled('div')`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #6d86b2;
  gap: 12px;

  .img-wrapper {
    background: #4f658c33;
    border-radius: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .value {
    color: #fff;
  }
`

export const VaultTagLabel = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: fit-content;
  background: #476182;
  font-size: 13px;
  font-weight: 600;
  color: #bbfb5b;
  border-radius: 6px;
  margin-bottom: 4px;
  padding: 4px 8px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: 19px;
  }
`

export const VaultListItemImageWrapper = styled('div')`
  display: flex;
  justify-content: left;

  img {
    border-radius: 18px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    img {
      margin-top: 0;
    }
  }
`

type VaultListItemProps = {
  vaultItemData: IVault
}

const VaultListItem: FC<VaultListItemProps> = ({ vaultItemData }) => {
  const { token } = vaultItemData
  const router = useRouter()

  const [newVaultDeposit, setNewVaultDeposit] = useState<boolean>(false)
  const [manageVault, setManageVault] = useState<boolean>(false)

  const redirectToVaultDetail = useCallback(() => {
    router.push(`/vaults/${vaultItemData.id}`)
  }, [vaultItemData.id])

  const handleWithdrawAll = useCallback(() => {
    alert('Withdraw all')
  }, [])

  let vaultPosition = null

  if (vaultItemData.id !== '1') {
    vaultPosition = {
      id: '1',
      balancePosition: '101',
      balanceShares: '102',
    }
  }

  return (
    <>
      <BaseTableItemRow>
        <TableCell
          colSpan={2}
          sx={{ width: '20%', cursor: 'pointer' }}
          onClick={redirectToVaultDetail}
        >
          <FlexBox sx={{ justifyContent: 'flex-start', gap: '11px' }}>
            <VaultListItemImageWrapper>
              <Image
                src={getTokenLogoURL('1')}
                width={24}
                height={24}
                alt={vaultItemData.id}
              />
            </VaultListItemImageWrapper>
            <Box>
              {vaultItemData.id === '4' ? (
                <VaultTagLabel>Finished</VaultTagLabel>
              ) : (
                <VaultTagLabel>Live</VaultTagLabel>
              )}
              <VaultTitle>{vaultItemData.name}</VaultTitle>
            </Box>
          </FlexBox>
        </TableCell>
        <TableCell colSpan={1} sx={{ width: '11%' }}>
          <VaultEarned>$ 100.00</VaultEarned>
        </TableCell>
        <TableCell colSpan={1} sx={{ width: '10%' }}>
          <VaultApr>10 %</VaultApr>
        </TableCell>
        <TableCell colSpan={2} sx={{ width: '13%' }}>
          <VaultStackedLiquidity>{formatCurrency(100)}</VaultStackedLiquidity>
        </TableCell>
        <TableCell colSpan={1} sx={{ width: '14%' }}>
          <VaultAvailable>
            {formatNumber(50000000) + ' ' + token.name}
          </VaultAvailable>
        </TableCell>
        <TableCell colSpan={1} sx={{ width: '15%' }}>
          <VaultStacked>
            <Box className={'img-wrapper'}>
              {vaultItemData.id === '1' ? (
                <Image
                  src={LockAquaSrc as string}
                  alt={'locked-active'}
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={LockSrc as string}
                  alt={'locked'}
                  width={20}
                  height={20}
                />
              )}
            </Box>
            <Box className={'value'}>{'21 ' + token.name}</Box>
          </VaultStacked>
        </TableCell>
        <TableCell colSpan={4}>
          <FlexBox
            sx={{
              justifyContent: 'flex-end',
              gap: '16px',
              mx: '16px',
              width: 'inherit',
            }}
          >
            {vaultItemData.id === '1' && (
              <Button
                variant="contained"
                onClick={() => setNewVaultDeposit(true)}
                sx={{ minWidth: '100px' }}
              >
                Deposit
              </Button>
            )}
            {vaultItemData.id === '2' && (
              <Button
                variant="contained"
                onClick={() => setManageVault(true)}
                sx={{ minWidth: '100px' }}
              >
                Manage
              </Button>
            )}
            {vaultItemData.id === '3' && (
              <Button
                variant="contained"
                onClick={() => setManageVault(true)}
                sx={{ minWidth: '100px' }}
              >
                Withdraw
              </Button>
            )}
            {vaultItemData.id === '4' && (
              <Button
                variant="contained"
                onClick={handleWithdrawAll}
                sx={{ minWidth: '100px' }}
              >
                Withdraw all
              </Button>
            )}
          </FlexBox>
        </TableCell>
      </BaseTableItemRow>
      {useMemo(() => {
        return (
          newVaultDeposit && (
            <VaultListItemDepositModal
              vaultItemData={vaultItemData}
              isTfVaultType={vaultItemData.id === '1'}
              activeTfPeriod={1}
              onClose={() => setNewVaultDeposit(false)}
            />
          )
        )
      }, [newVaultDeposit, setNewVaultDeposit])}
      {useMemo(() => {
        return (
          manageVault && (
            <VaultListItemManageModal
              vaultItemData={vaultItemData}
              vaultPosition={vaultPosition}
              performanceFee={10}
              isTfVaultType={vaultItemData.id === '1'}
              activeTfPeriod={1}
              onClose={() => setManageVault(false)}
            />
          )
        )
      }, [manageVault, setManageVault])}
    </>
  )
}

export default memo(VaultListItem)
