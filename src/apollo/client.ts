import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { defaultNetWork, SUBGRAPH_URLS } from '@/utils/network'

/***
 * For Query we have pagination, So we need to return incoming items
 */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        positions: {
          keyArgs: ['network', 'account'],
          merge(_, incoming) {
            return incoming
          },
        },
        proposals: {
          keyArgs: false,
          merge(_, incoming) {
            return incoming
          },
        },
        pools: {
          keyArgs: ['network'],
          merge(_, incoming) {
            return incoming
          },
        },
        strategyHistoricalAprs: {
          keyArgs: ['strategy', 'network'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
        strategyReports: {
          keyArgs: ['strategy', 'network'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
        accountVaultPositions: {
          keyArgs: ['account'],
          merge(_, incoming) {
            return incoming
          },
        },
        vaults: {
          keyArgs: ['network'],
          merge(_, incoming) {
            return incoming
          },
        },
        indexingStatusForCurrentVersion: {
          keyArgs: ['network'],
          merge(_, incoming) {
            return incoming
          },
        },
        users: {
          keyArgs: ['walletAddress'],
          merge(_, incoming) {
            return incoming
          },
        },
        mints: {
          keyArgs: ['account'],
          merge(_, incoming) {
            return incoming
          },
        },
        burns: {
          keyArgs: ['account'],
          merge(_, incoming) {
            return incoming
          },
        },
        swaps: {
          keyArgs: ['account'],
          merge(_, incoming) {
            return incoming
          },
        },
        lockPositions: {
          keyArgs: ['account'],
          merge(_, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

if (process.env.NEXT_PUBLIC_ENV === 'dev') {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

const httpLink = new HttpLink({ uri: SUBGRAPH_URLS[defaultNetWork] })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const network = operation.getContext().network

  let uri =
    network && (SUBGRAPH_URLS as any)[network]
      ? (SUBGRAPH_URLS as any)[network]
      : SUBGRAPH_URLS[defaultNetWork]

  if (operation.getContext().clientName === 'stable') {
    uri += '/subgraphs/name/stablecoin-subgraph'
  } else if (operation.getContext().clientName === 'governance') {
    uri += '/subgraphs/name/dao-subgraph'
  } else if (operation.getContext().clientName === 'vaults') {
    uri += '/subgraphs/name/splyce-vault-subgraph'
  } else {
    uri += '/graphql'
  }

  operation.setContext(() => ({
    uri,
  }))

  return forward(operation)
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})

export const dexClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.xinfin.fathom.fi/subgraphs/name/dex-subgraph',
  }),
  cache: new InMemoryCache(),
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.xinfin.fathom.fi/graphql',
  }),
  cache: new InMemoryCache(),
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.xinfin.fathom.fi/subgraphs/name/blocklytics/ethereum-blocks',
  }),
  cache: new InMemoryCache(),
})
