import { FC, memo, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { Box, Typography, styled, ListItemText } from '@mui/material'
import { formatNumber, formatPercentage } from '@/utils/format'
import { getExplorerUrl } from '@/utils/explorer'
import useSharedContext from '@/context/shared'
import useVaultContext from '@/context/vaultDetail'
import {
  DescriptionList,
  strategyDescription,
  strategyTitle,
} from '@/utils/Vaults/getStrategyTitleAndDescription'
// import { IVaultStrategyHistoricalApr } from 'hooks/Vaults/useVaultListItem'
import VaultHistoryChart, {
  HistoryChartDataType,
} from '@/components/Vaults/Detail/VaultHistoryChart'
import { StatusLabel } from '@/components/Vaults/Detail/Managment/StrategyStatusBar'
import { IVaultStrategy, IVaultStrategyReport } from '@/utils/TempData'
import { IVaultStrategyHistoricalApr } from '@/hooks/Vaults/useVaultDetail'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import { AppListFees } from '@/components/Vaults/Detail/Tabs/InfoTabAbout'
import BasePopover from '@/components/Base/Popover/BasePopover'
import { BaseListItem } from '@/components/Base/List/StyledList'

dayjs.extend(relativeTime)

export const VaultStrategyTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`
export const VaultStrategyDescription = styled(Box)`
  font-size: 14px;
  font-weight: 400;
  color: #d1dae6;
  padding-bottom: 20px;
  p {
    margin: 0;
  }
  b {
    display: inline-block;
    margin-top: 8px;
  }
  ul {
    padding-left: 20px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 12px;
  }
`

export const VaultIndicatorsWrapper = styled(FlexBox)`
  padding-top: 24px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    gap: 4px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

export const VaultIndicatorItemWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

export const VaultIndicatorItemLabel = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: #6d86b2;
  text-align: left;
  padding-bottom: 4px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 13px;
    padding-bottom: 0;
  }
`

export const VaultIndicatorItemValue = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 13px;
  }
`

type VaultIndicatorItemPropsType = {
  title: string
  value: string | number
  units: string
  sx?: object
}

type VaultStrategyItemPropsType = {
  reports: IVaultStrategyReport[]
  historicalApr: IVaultStrategyHistoricalApr[]
  strategyData: IVaultStrategy
  vaultBalanceTokens: string
  tokenName: string
  performanceFee: number
  index: number
  vaultId: string
  isShow?: boolean
  reportsLoading?: boolean
}

const VaultIndicatorItem: FC<VaultIndicatorItemPropsType> = memo(
  ({ title, value, units, sx }) => {
    return (
      <VaultIndicatorItemWrapper sx={sx}>
        <VaultIndicatorItemLabel>{title}</VaultIndicatorItemLabel>
        <VaultIndicatorItemValue>{value + units}</VaultIndicatorItemValue>
      </VaultIndicatorItemWrapper>
    )
  }
)

const VaultStrategyItem: FC<VaultStrategyItemPropsType> = ({
  strategyData,
  vaultBalanceTokens,
  tokenName,
  performanceFee,
  index,
  vaultId,
  reports,
  historicalApr,
  isShow,
  reportsLoading = false,
}) => {
  const [aprHistoryArr, setAprHistoryArr] = useState<HistoryChartDataType[]>([])
  const [lastReportDate, setLastReportDate] = useState<string>('')
  const [allocationShare, setAllocationShare] = useState<number>(0)

  const { isTfVaultType } = useVaultContext()
  const { isMobile } = useSharedContext()

  useEffect(() => {
    if (!historicalApr.length || !reports.length) return

    const extractedData = reports
      .map((reportsItem, index) => {
        return {
          timestamp: reportsItem.timestamp,
          chartValue: '1001',
        }
      })
      .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))

    if (reports.length) {
      const lastReport = dayjs(parseInt(reports[0].timestamp, 10)).fromNow()

      setLastReportDate(lastReport)
    }

    setAprHistoryArr(extractedData)
  }, [historicalApr, reports, vaultId])

  useEffect(() => {
    const allocation =
      vaultBalanceTokens !== '0'
        ? BigNumber(strategyData.currentDebt)
            .dividedBy(BigNumber(vaultBalanceTokens).dividedBy(100))
            .toNumber()
        : 0

    setAllocationShare(allocation)
  }, [strategyData, vaultBalanceTokens])

  const totalGain = useMemo(
    () =>
      reports.reduce((acc: BigNumber, report: IVaultStrategyReport) => {
        return acc.plus(report.gain)
      }, BigNumber(0)),
    [reports]
  )

  const title = useMemo(() => {
    if (strategyTitle[strategyData.id.toLowerCase()]) {
      return strategyTitle[strategyData.id.toLowerCase()]
    } else {
      return `FXD: Direct Incentive - Educational Strategy ${index + 1}`
    }
  }, [strategyData.id, index])

  return (
    <Box sx={{ display: isShow ? 'block' : 'none' }}>
      <VaultStrategyTitle>
        {title}
        <StatusLabel strategyId={strategyData.id} />
      </VaultStrategyTitle>
      <Link
        href={getExplorerUrl(strategyData.id as string)}
        target="_blank"
        style={{
          display: 'inline-flex',
          fontSize: isMobile ? '12px' : '14px',
          color: '#D1DAE6',
          textDecoration: 'underline',
          marginBottom: '16px',
        }}
      >
        {strategyData.id}
      </Link>
      <VaultStrategyDescription>
        {strategyDescription[strategyData.id.toLowerCase()] ? (
          strategyDescription[strategyData.id.toLowerCase()]
        ) : (
          <>
            <p>
              The strategy enhances returns for FXD Vault investors by ensuring
              continuous earnings. Here's what makes it stand out:
            </p>
            <DescriptionList>
              <li>
                Consistent Earnings: Our approach guarantees a steady flow of
                returns to Vault participants, boosting investment outcomes and
                securing the Vault's growth.
              </li>
              <li>
                Transparency and Security: Trust is key. We share detailed
                performance and earnings reports, keeping operations transparent
                and secure.
              </li>
              <li>
                Educational: Designed to give returns as direct incentivization,
                the strategy reduces participants' risk and doesn't suffer from
                market fluctuations.
              </li>
            </DescriptionList>
          </>
        )}
      </VaultStrategyDescription>
      {lastReportDate && (
        <Typography
          fontSize={isMobile ? '14px' : '16px'}
        >{`Last report ${lastReportDate}.`}</Typography>
      )}
      <AppListFees
        sx={{ borderTop: '1px solid #476182', paddingTop: '24px !important' }}
      >
        <BaseListItem
          secondaryAction={
            <>{`${formatNumber(
              BigNumber(strategyData.currentDebt)
                .dividedBy(10 ** 18)
                .toNumber()
            )} ${tokenName}`}</>
          }
        >
          <ListItemText primary="Capital Allocation" />
        </BaseListItem>
        <BaseListItem
          secondaryAction={
            <>{`${formatNumber(totalGain.dividedBy(10 ** 18).toNumber())} ${tokenName}`}</>
          }
        >
          <ListItemText primary="Total Gain" />
        </BaseListItem>
        <BaseListItem
          secondaryAction={<>{`${formatNumber(Number('1002'))}%`}</>}
        >
          <ListItemText primary="APY" />
        </BaseListItem>
        <BaseListItem
          secondaryAction={<>{`${formatNumber(allocationShare)}%`}</>}
        >
          <ListItemText primary="Allocation" />
        </BaseListItem>
        <BaseListItem
          secondaryAction={<>{`${formatNumber(performanceFee)}%`}</>}
        >
          <ListItemText primary="Perfomance fee" />
        </BaseListItem>
      </AppListFees>
      {!isTfVaultType && (
        <Box width={'100%'} pt="24px">
          <VaultHistoryChart
            title={'Historical APY'}
            chartDataArray={aprHistoryArr}
            valueLabel="APY"
            valueUnits="%"
            isLoading={false}
          />
        </Box>
      )}
    </Box>
  )
}

export default memo(VaultStrategyItem)
