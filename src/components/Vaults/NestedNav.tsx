import { useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  NestedRouteLink,
  NestedRouteNav,
} from '@/components/Base/Nav/NestedNav'

const VaultsNestedNav = () => {
  const location = useRouter()

  const isOverviewActive = useMemo(
    () => ['/vaults'].includes(location.pathname),
    [location.pathname]
  )

  // const isTutorialActive = useMemo(() => {
  //   return location.pathname.includes('/vaults/tutorial')
  // }, [location.pathname])
  return (
    <NestedRouteNav>
      <NestedRouteLink
        className={isOverviewActive ? 'active' : ''}
        href="/vaults"
      >
        Vault Management
      </NestedRouteLink>
      {/*<NestedRouteLink*/}
      {/*  className={isTutorialActive ? 'active' : ''}*/}
      {/*  href="/vaults/tutorial"*/}
      {/*>*/}
      {/*  Tutorial*/}
      {/*</NestedRouteLink>*/}
    </NestedRouteNav>
  )
}

export default VaultsNestedNav