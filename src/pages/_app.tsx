import type { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import '@/theme/globals.css'

const DynamicProviders = dynamic(() =>
  import('@/provider').then((mod) => mod.Providers)
)
const AppNavLayout = dynamic(
  () => import('@/components/AppLayout/AppNavLayout')
)

const MyApp = ({ Component, pageProps, ...props }: AppProps) => {
  console.log('_app props: ', props)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="twitter:image"
          content="https://img-v1.raydium.io/share/7be7ee6c-56b2-451e-a010-6c21e0db2ee5.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SplyceFi" />
        <meta name="twitter:creator" content="@SplyceFi" />
        <meta name="twitter:title" content="Splyce" />
        <meta
          name="twitter:description"
          content="An on-chain order book AMM powering the evolution of DeFi "
        />
        <meta
          property="og:description"
          content="An on-chain order book AMM powering the evolution of DeFi "
        />
        <meta property="og:url" content="https://www.splyce.finance/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://img-v1.raydium.io/share/7be7ee6c-56b2-451e-a010-6c21e0db2ee5.png"
        />
        <meta property="og:image:alt" content="Splyce" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Splyce" />
        <meta property="og:title" content="Splyce Title" />
        <title>
          {pageProps?.title ? `${pageProps.title} Splyce` : 'Splyce'}
        </title>
      </Head>
      <DynamicProviders>
        <AppNavLayout>
          <Component {...pageProps} />
        </AppNavLayout>
      </DynamicProviders>
    </>
  )
}

export default MyApp
