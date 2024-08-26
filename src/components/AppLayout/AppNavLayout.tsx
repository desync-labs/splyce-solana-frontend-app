import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import SolWallet from '@/components/SolWallet'

import SplyceAppLogoSrc from 'assets/png/splyce-logo.png'
import SplyceAppLogoMobileSrc from 'assets/png/splyce-logo-mobile.png'

const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const AppNavLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <LogoLink href={'/'}>
            <Image
              src={SplyceAppLogoSrc as string}
              alt={'logo'}
              width={100}
              height={15}
            />
          </LogoLink>
          <SolWallet />
        </Toolbar>
      </AppBar>
      <Box component="main">{children}</Box>
    </>
  )
}

export default AppNavLayout
