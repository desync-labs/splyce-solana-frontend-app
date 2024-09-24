import { useState } from 'react'
import { Container, Paper } from '@mui/material'
import useSharedContext from '@/context/shared'
import { IVault, SortType } from '@/utils/TempData'
import VaultsNestedNav from '@/components/Vaults/NestedNav'
import BasePageHeader from '@/components/Base/PageHeader'
import VaultsTotalStats from '@/components/Vaults/List/VaultsTotalStats'
import VaultsList from '@/components/Vaults/List/VaultsList'
import VaultFilters from '@/components/Vaults/List/VaultFilters'
import VaultsListMobile from '@/components/Vaults/List/VaultsListMobile'

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
  const { isMobile } = useSharedContext()
  const { search, setSearch } = useState('')
  const { sortBy, setSortBy } = useState<SortType>(SortType.TVL)
  const { isShutdown, setIsShutdown } = useState(false)

  const handleIsShutdown = (value: boolean) => {
    setIsShutdown(value)
  }

  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader
          title="Vaults"
          description="Explore existing Vaults, and deposit your assets for a sustainable yield."
        />
        <VaultsTotalStats positionsLoading={false} positionsList={[]} />
        {isMobile ? (
          <>
            <VaultFilters
              search={search}
              sortBy={sortBy}
              isShutdown={isShutdown}
              setSearch={setSearch}
              setSortBy={setSortBy}
              handleIsShutdown={handleIsShutdown}
            />
            <VaultsListMobile vaults={vaults} />
          </>
        ) : (
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
        )}
      </Container>
    </>
  )
}

export default VaultsOverview
