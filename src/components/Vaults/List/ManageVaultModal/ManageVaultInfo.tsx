import { FC, memo } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Divider, ListItemText } from '@mui/material'

import { FormType } from 'hooks/Vaults/useVaultManageDeposit'
import { formatNumber, formatPercentage } from 'utils/format'
import {
  BaseDialogFormInfoWrapper,
  BaseDialogSummary,
  BaseFormInfoList,
} from 'components/Base/Form/StyledForm'
import { IVault, IVaultPosition } from '@/utils/TempData'
import { BaseListItem } from '@/components/Base/List/StyledList'

type VaultManageInfoProps = {
  vaultItemData: IVault
  vaultPosition: IVaultPosition
  formToken: string
  formSharedToken: string
  formType: FormType
  performanceFee: number
}

const ManageVaultInfo: FC<VaultManageInfoProps> = ({
  formType,
  vaultItemData,
  vaultPosition,
  formToken,
  formSharedToken,
  performanceFee,
}) => {
  const { token, shareToken, sharesSupply } = vaultItemData
  const { balancePosition, balanceShares } = vaultPosition
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
              {formatPercentage(
                BigNumber(balancePosition)
                  .dividedBy(10 ** 18)
                  .toNumber()
              ) +
                ' ' +
                token.name +
                ' '}
              <Box
                component="span"
                sx={{
                  color: formType === FormType.DEPOSIT ? '#29C20A' : '#F76E6E',
                }}
              >
                →{' '}
                {formType === FormType.DEPOSIT
                  ? formatPercentage(
                      BigNumber(balancePosition)
                        .dividedBy(10 ** 18)
                        .plus(BigNumber(formToken || '0'))
                        .toNumber()
                    ) +
                    ' ' +
                    token.name +
                    ' '
                  : formatPercentage(
                      Math.max(
                        BigNumber(balancePosition)
                          .dividedBy(10 ** 18)
                          .minus(BigNumber(formToken || '0'))
                          .toNumber(),
                        0
                      )
                    ) +
                    ' ' +
                    token.name +
                    ' '}
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
              {`${formatNumber(
                BigNumber(balanceShares)
                  .dividedBy(BigNumber(sharesSupply))
                  .multipliedBy(100)
                  .toNumber()
              )} %`}
              <Box
                component="span"
                sx={{
                  color: formType === FormType.DEPOSIT ? '#29C20A' : '#F76E6E',
                }}
              >
                →{' '}
                {formType === FormType.DEPOSIT
                  ? formatNumber(
                      BigNumber(balanceShares)
                        .plus(
                          BigNumber(formSharedToken || '0').multipliedBy(
                            10 ** 18
                          )
                        )
                        .dividedBy(
                          BigNumber(sharesSupply).plus(
                            BigNumber(formSharedToken || '0').multipliedBy(
                              10 ** 18
                            )
                          )
                        )
                        .multipliedBy(100)
                        .toNumber()
                    )
                  : BigNumber(formSharedToken)
                        .multipliedBy(10 ** 18)
                        .isEqualTo(BigNumber(sharesSupply))
                    ? '0'
                    : formatNumber(
                        Math.max(
                          BigNumber(balanceShares)
                            .minus(
                              BigNumber(formSharedToken || '0').multipliedBy(
                                10 ** 18
                              )
                            )
                            .dividedBy(
                              BigNumber(sharesSupply).minus(
                                BigNumber(formSharedToken || '0').multipliedBy(
                                  10 ** 18
                                )
                              )
                            )
                            .multipliedBy(100)
                            .toNumber(),
                          0
                        )
                      )}{' '}
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
              {formatPercentage(
                BigNumber(balanceShares)
                  .dividedBy(10 ** 18)
                  .toNumber()
              ) +
                ' ' +
                shareToken.name +
                ' '}
              <Box
                component="span"
                sx={{
                  color: formType === FormType.DEPOSIT ? '#29C20A' : '#F76E6E',
                }}
              >
                →{' '}
                {formType === FormType.DEPOSIT
                  ? formatPercentage(
                      BigNumber(balanceShares)
                        .dividedBy(10 ** 18)
                        .plus(BigNumber(formSharedToken || '0'))
                        .toNumber()
                    ) +
                    ' ' +
                    shareToken.name
                  : formatPercentage(
                      Math.max(
                        BigNumber(balanceShares)
                          .dividedBy(10 ** 18)
                          .minus(BigNumber(formSharedToken || '0'))
                          .toNumber(),
                        0
                      )
                    ) +
                    ' ' +
                    shareToken.name}{' '}
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

export default memo(ManageVaultInfo)
