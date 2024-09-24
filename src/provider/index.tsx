import { ReactNode } from 'react'
import WalletProvider from './WalletProvider'
import { AppThemeProvider } from './ThemeProvider'
import { SharedProvider } from '@/context/shared'

export { WalletProvider, AppThemeProvider }

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppThemeProvider>
      <SharedProvider>
        <WalletProvider>{children}</WalletProvider>
      </SharedProvider>
    </AppThemeProvider>
  )
}
