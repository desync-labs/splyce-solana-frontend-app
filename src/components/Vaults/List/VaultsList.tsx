import { FC, memo } from 'react'
import {
  Pagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material'
import BasePopover from '@/components/Base/Popover/BasePopover'
import { VaultListItemSkeleton } from '@/components/Vaults/List/VaultListItemSkeleton'
import VaultListItem from '@/components/Vaults/List/VaultListItem'
import {
  BaseTableCell,
  BaseTableCellPopover,
  BaseTableHeaderRow,
  BaseTablePaginationWrapper,
} from '@/components/Base/Table/StyledTable'
import { IVault } from '@/utils/TempData'

type VaultListPropsType = {
  vaults: IVault[]
}

const VaultsList: FC<VaultListPropsType> = ({ vaults }) => {
  const isLoading = false
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <BaseTableHeaderRow>
            <BaseTableCell colSpan={2}>Name</BaseTableCell>
            <BaseTableCell colSpan={1}>
              <BaseTableCellPopover>
                Earned
                <BasePopover
                  id={'earned'}
                  text={<>How much have you earned on this Vault so far.</>}
                />
              </BaseTableCellPopover>
            </BaseTableCell>
            <BaseTableCell colSpan={1}>
              <BaseTableCellPopover>
                Apy
                <BasePopover
                  id={'apr'}
                  text={
                    <>
                      Annual Percentage Yield – The annualized rate of return
                      for the vault.
                    </>
                  }
                />
              </BaseTableCellPopover>
            </BaseTableCell>
            <BaseTableCell colSpan={2}>
              <BaseTableCellPopover>
                Tvl
                <BasePopover
                  id={'tvl'}
                  text={
                    <>
                      Total value locked (TVL) is a metric that refers to the
                      sum of assets that are staked in the Vault.
                    </>
                  }
                />
              </BaseTableCellPopover>
            </BaseTableCell>
            <BaseTableCell colSpan={1}>Available</BaseTableCell>
            <BaseTableCell colSpan={1}>Staked</BaseTableCell>
            <BaseTableCell colSpan={4}></BaseTableCell>
          </BaseTableHeaderRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              <VaultListItemSkeleton />
              <VaultListItemSkeleton />
            </>
          ) : (
            vaults.map((vault) => (
              <VaultListItem key={vault.id} vaultItemData={vault} />
            ))
          )}
        </TableBody>
      </Table>
      <BaseTablePaginationWrapper>
        <Pagination count={3} page={1} />
      </BaseTablePaginationWrapper>
    </TableContainer>
  )
}

export default memo(VaultsList)
