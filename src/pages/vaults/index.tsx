import { Container } from '@mui/material'
import VaultsNestedNav from '@/components/Vaults/NestedNav'
import BasePageHeader from '@/components/Base/PageHeader'

const VaultsOverview = () => {
  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader
          title="Vaults"
          description="Explore existing Vaults, and deposit your assets for a sustainable yield."
        />
      </Container>
    </>
  )
}

export default VaultsOverview
