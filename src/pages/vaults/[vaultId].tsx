import { useState } from 'react'
import { Container, Grid } from '@mui/material'
import { VaultProvider } from '@/context/vaultDetail'
import { VaultBreadcrumbs } from '@/components/Base/Breadcrumbs/StyledBreadcrumbs'
import VaultPositionStats from '@/components/Vaults/Detail/VaultPositionStats'
import VaultProfitCalculator from '@/components/Vaults/Detail/VaultProfitCalculator'
import VaultLockingBar from '@/components/Vaults/Detail/VaultLockingBar'
import VaultDetailDepositForm from '@/components/Vaults/Detail/Forms/VaultDetailDepositForm'
import VaultDetailInfoTabs from '@/components/Vaults/Detail/Tabs/InfoTabs'

const VaultDetailPage = () => {
  const [notLoading, setNotLoaded] = useState(true)
  return (
    <VaultProvider>
      <Container>
        <VaultBreadcrumbs />
        <VaultPositionStats />
        <Grid container spacing={2} pt="12px" alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <VaultLockingBar />
          </Grid>
          <Grid item xs={12} sm={6}>
            <VaultProfitCalculator />
          </Grid>
        </Grid>
        <VaultDetailDepositForm notLoading={notLoading} />
        <VaultDetailInfoTabs />
      </Container>
    </VaultProvider>
  )
}

export default VaultDetailPage
