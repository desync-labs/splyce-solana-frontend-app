import { Container, Paper } from '@mui/material'
import VaultsNestedNav from '@/components/Vaults/NestedNav'
import BasePageHeader from '@/components/Base/PageHeader'
import VaultsTotalStats from '@/components/Vaults/List/VaultsTotalStats'
import VaultsList from '@/components/Vaults/List/VaultsList'
import { IVault, SortType } from '@/utils/TempData'
import VaultFilters from '@/components/Vaults/List/VaultFilters'
import { useState } from 'react'

const vaults: IVault[] = [
  {
    id: '1',
    name: 'Vault 1',
    token: {
      id: '1',
      name: 'SPLY',
    },
    shareToken: {
      id: '2',
      name: 'Share Token 1',
    },
  },
  {
    id: '2',
    name: 'Vault 2',
    token: {
      id: '1',
      name: 'SPLY',
    },
    shareToken: {
      id: '2',
      name: 'Share Token 2',
    },
  },
  {
    id: '3',
    name: 'Vault 3',
    token: {
      id: '1',
      name: 'SPLY',
    },
    shareToken: {
      id: '2',
      name: 'Share Token 3',
    },
  },
  {
    id: '4',
    name: 'Vault 4',
    token: {
      id: '1',
      name: 'SPLY',
    },
    shareToken: {
      id: '2',
      name: 'Share Token 4',
    },
  },
]

const VaultsOverview = () => {
  const { search, setSearch } = useState('')
  const { sortBy, setSortBy } = useState<SortType>(SortType.TVL)
  const { isShutdown, setIsShutdown } = useState(false)

  const handleIsShutdown = (value: boolean) => {
    setIsShutdown(value)
  }

  console.log(1, sortBy)
  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader
          title="Vaults"
          description="Explore existing Vaults, and deposit your assets for a sustainable yield."
        />
        <VaultsTotalStats positionsLoading={false} positionsList={[]} />
        <Paper sx={{ padding: 0 }}>
          <VaultFilters
            search={search}
            sortBy={sortBy}
            isShutdown={isShutdown}
            setSearch={setSearch}
            setSortBy={setSortBy}
            handleIsShutdown={handleIsShutdown}
          />
          <VaultsList vaults={vaults} />
        </Paper>
      </Container>
    </>
  )
}

export default VaultsOverview
