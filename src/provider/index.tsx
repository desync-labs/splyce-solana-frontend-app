import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import WalletProvider from './WalletProvider'
import { AppThemeProvider } from './ThemeProvider'
import { SharedProvider } from '@/context/shared'

import { client } from '@/apollo/client'

export { WalletProvider, AppThemeProvider }

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppThemeProvider>
      <SharedProvider>
        <WalletProvider>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </WalletProvider>
      </SharedProvider>
    </AppThemeProvider>
  )
}
