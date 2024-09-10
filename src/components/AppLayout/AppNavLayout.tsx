import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { AppBar, CssBaseline, Toolbar } from '@mui/material'
import { styled } from '@mui/system'

import useVH from '@/hooks/General/useVH'

import { MainBox } from '@/components/Base/Boxes/StyledBoxes'
import SolWallet from '@/components/SolWallet'
import { Menu } from '@/components/AppLayout/Menu'
import Footer from '@/components/AppLayout/Footer'

import SplyceAppLogoSrc from 'assets/png/splyce-logo.png'
import SplyceAppLogoMobileSrc from 'assets/png/splyce-logo-mobile.png'

const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const AppNavLayout = ({ children }: { children: ReactNode }) => {
  useVH()
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <LogoLink href={'/'}>
            <Image
              src={SplyceAppLogoSrc as string}
              alt={'logo'}
              width={132}
              height={20}
            />
          </LogoLink>
          <Menu />
          <SolWallet />
        </Toolbar>
      </AppBar>
      <MainBox component="main">{children}</MainBox>
      <Footer />
    </>
  )
}

export default AppNavLayout
