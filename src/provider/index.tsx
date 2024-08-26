import { ReactNode } from 'react'
import WalletProvider from './WalletProvider'
import { AppThemeProvider } from './ThemeProvider'

export { WalletProvider, AppThemeProvider }

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppThemeProvider>
      <WalletProvider>{children}</WalletProvider>
    </AppThemeProvider>
  )
}
