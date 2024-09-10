import { Container } from '@mui/material'
import VaultsNestedNav from '@/components/Vaults/NestedNav'
import BasePageHeader from '@/components/Base/PageHeader'

const VaultsTutorial = () => {
  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader title="Tutorials" />
      </Container>
    </>
  )
}

export default VaultsTutorial
