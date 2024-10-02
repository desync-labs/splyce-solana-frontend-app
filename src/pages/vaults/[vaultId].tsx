import { Container } from '@mui/material'
import { VaultProvider } from '@/context/vaultDetail'
import { VaultBreadcrumbs } from '@/components/Base/Breadcrumbs/StyledBreadcrumbs'
import VaultPositionStats from '@/components/Vaults/Detail/VaultPositionStats'
import VaultDetailDepositForm from '@/components/Vaults/Detail/Forms/VaultDetailDepositForm'
import VaultDetailInfoTabs from '@/components/Vaults/Detail/Tabs/InfoTabs'
import VaultLockCalculatorBlock from '@/components/Vaults/Detail/VaultLockCalculatorBlock'

const VaultDetailPage = () => {
  return (
    <VaultProvider>
      <Container>
        <VaultBreadcrumbs />
        <VaultPositionStats />
        <VaultLockCalculatorBlock />
        <VaultDetailDepositForm />
        <VaultDetailInfoTabs />
      </Container>
    </VaultProvider>
  )
}

export default VaultDetailPage
