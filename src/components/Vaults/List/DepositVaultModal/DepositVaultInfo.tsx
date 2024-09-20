import { FC, memo } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Divider, ListItemText } from '@mui/material'
import { formatNumber, formatPercentage } from '@/utils/format'
import { IVault } from '@/utils/TempData'
import {
  BaseDialogFormInfoWrapper,
  BaseDialogSummary,
  BaseFormInfoList,
} from '@/components/Base/Form/StyledForm'
import { BaseListItem } from '@/components/Base/List/StyledList'

type VaultDepositInfoProps = {
  vaultItemData: IVault
  deposit: string
  sharedToken: string
  performanceFee: number
}

const DepositVaultInfo: FC<VaultDepositInfoProps> = ({
  vaultItemData,
  deposit,
  sharedToken,
  performanceFee,
}) => {
  const { token, shareToken, sharesSupply } = vaultItemData
  const formattedApr = '10.00'

  return (
    <BaseDialogFormInfoWrapper>
      <BaseDialogSummary>Summary</BaseDialogSummary>
      <Divider />
      <BaseFormInfoList>
        <BaseListItem
          alignItems="flex-start"
          secondaryAction={
            <>
              0 {token.name + ' '}
              <Box component="span" sx={{ color: '#3DA329' }}>
                → {formatPercentage(Number(deposit || '0')) + ' ' + token.name}
              </Box>
            </>
          }
        >
          <ListItemText primary={token.name + ' Deposited'} />
        </BaseListItem>
        <BaseListItem
          alignItems="flex-start"
          secondaryAction={
            <>
              0 %{' '}
              <Box component="span" sx={{ color: '#3DA329' }}>
                →{' '}
                {BigNumber(sharedToken).isGreaterThan(0) ||
                BigNumber(sharesSupply).isGreaterThan(0)
                  ? formatNumber(
                      BigNumber(sharedToken || '0')
                        .multipliedBy(10 ** 18)
                        .dividedBy(
                          BigNumber(sharesSupply).plus(
                            BigNumber(sharedToken || '0').multipliedBy(10 ** 18)
                          )
                        )
                        .times(100)
                        .toNumber()
                    )
                  : '0'}{' '}
                %
              </Box>
            </>
          }
        >
          <ListItemText primary="Pool share" />
        </BaseListItem>
        <BaseListItem
          alignItems="flex-start"
          secondaryAction={
            <>
              {`0 ${shareToken.name} `}
              <Box component="span" sx={{ color: '#3DA329' }}>
                →{' '}
                {formatPercentage(Number(sharedToken || '0')) +
                  ' ' +
                  shareToken.name}
              </Box>
            </>
          }
        >
          <ListItemText primary="Share tokens" />
        </BaseListItem>
        <BaseListItem
          alignItems="flex-start"
          secondaryAction={formatPercentage(Number(performanceFee)) + '%'}
        >
          <ListItemText primary="Total Fee" />
        </BaseListItem>
        <BaseListItem
          alignItems="flex-start"
          secondaryAction={formattedApr + '%'}
        >
          <ListItemText primary="Estimated APY" />
        </BaseListItem>
      </BaseFormInfoList>
    </BaseDialogFormInfoWrapper>
  )
}

export default memo(DepositVaultInfo)
