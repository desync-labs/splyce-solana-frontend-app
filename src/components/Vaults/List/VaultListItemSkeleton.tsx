import { Box, Skeleton, styled, TableCell } from '@mui/material'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import { VaultListItemImageWrapper } from 'components/Vaults/List/VaultListItem'
import { VaultListItemImageWrapper as VaultListItemImageWrapperMobile } from 'components/Vaults/List/VaultListItemMobile'
import { VaultItemTableRow } from 'components/Vaults/List/VaultListItemMobile'
import { BaseTableItemRow } from 'components/Base/Table/StyledTable'

const CustomSkeleton = styled(Skeleton)`
  background-color: #2536564a;
`

export const VaultListItemSkeleton = () => {
  return (
    <BaseTableItemRow>
      <TableCell colSpan={2} sx={{ width: '20%' }}>
        <FlexBox sx={{ justifyContent: 'flex-start', gap: '11px' }}>
          <VaultListItemImageWrapper>
            <CustomSkeleton
              animation="wave"
              variant="circular"
              width={36}
              height={36}
            />
          </VaultListItemImageWrapper>
          <Box>
            <CustomSkeleton
              animation={'wave'}
              width={40}
              height={28}
              sx={{ marginBottom: '4px' }}
            />
            <CustomSkeleton animation={'wave'} width={90} height={20} />
          </Box>
        </FlexBox>
      </TableCell>
      <TableCell colSpan={1} sx={{ width: '11%' }}>
        <CustomSkeleton animation={'wave'} width={35} />
      </TableCell>
      <TableCell colSpan={1} sx={{ width: '10%' }}>
        <CustomSkeleton animation={'wave'} width={40} />
      </TableCell>
      <TableCell colSpan={2} sx={{ width: '13%' }}>
        <CustomSkeleton animation={'wave'} width={100} />
      </TableCell>
      <TableCell colSpan={1} sx={{ width: '14%' }}>
        <CustomSkeleton animation={'wave'} width={100} />
      </TableCell>
      <TableCell colSpan={1} sx={{ width: '13%' }}>
        <CustomSkeleton animation={'wave'} width={100} />
      </TableCell>
      <TableCell colSpan={4}>
        <FlexBox sx={{ justifyContent: 'flex-end', gap: '16px', mx: '16px' }}>
          <CustomSkeleton animation={'wave'} width={100} height={36} />
        </FlexBox>
      </TableCell>
    </BaseTableItemRow>
  )
}

export const VaultListItemMobileSkeleton = () => {
  return (
    <VaultItemTableRow>
      <TableCell colSpan={2}>
        <FlexBox sx={{ justifyContent: 'flex-start', gap: '4px' }}>
          <VaultListItemImageWrapperMobile>
            <CustomSkeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
            />
          </VaultListItemImageWrapperMobile>
          <Box>
            <CustomSkeleton animation={'wave'} height={16} width={80} />
          </Box>
        </FlexBox>
      </TableCell>
      <TableCell colSpan={1}>
        <CustomSkeleton animation={'wave'} height={16} width={30} />
      </TableCell>
      <TableCell colSpan={2}>
        <CustomSkeleton animation={'wave'} height={16} width={80} />
      </TableCell>
      <TableCell colSpan={1}>
        <CustomSkeleton animation={'wave'} height={20} width={40} />
      </TableCell>
    </VaultItemTableRow>
  )
}
