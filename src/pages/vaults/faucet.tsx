import { FC, useEffect, useState } from 'react'
import { Button, CircularProgress, Container, Typography } from '@mui/material'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { faucetTestToken } from '@/utils/TempSdkMethods'
import BasePageHeader from '@/components/Base/PageHeader'
import VaultsNestedNav from '@/components/Vaults/NestedNav'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'
import { BaseInfoBox } from '@/components/Base/Boxes/StyledBoxes'

const FaucetIndex: FC = () => {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const { publicKey, wallet } = useWallet()

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleGetTestTokens = () => {
    if (!publicKey || !wallet) {
      return
    }
    setLoading(true)
    const testTokenPublicKey = new PublicKey(
      'H6RLQCTDbiJdNP1K8Cjoc5MAabaAq5fEdcpdJjSwuXB4'
    )
    try {
      faucetTestToken(publicKey, testTokenPublicKey, wallet)
        .then((res) => {
          console.log('Tx signature:', res)
        })
        .finally(() => {
          setLoading(false)
          setSuccessMessage(true)
        })
    } catch (error) {
      console.error('Error getting test tokens:', error)
    }
  }
  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader title="Faucet" />
        <Button
          variant="gradient"
          sx={{ marginTop: '24px' }}
          onClick={handleGetTestTokens}
          disabled={loading || successMessage || !publicKey || !wallet}
        >
          {loading ? (
            <CircularProgress sx={{ color: '#0D1526' }} size={20} />
          ) : (
            'Get test tokens'
          )}
        </Button>
        {successMessage && (
          <BaseInfoBox sx={{ marginTop: '24px' }}>
            <BaseInfoIcon />
            <Typography>You have received 100 Test Splyce USD</Typography>
          </BaseInfoBox>
        )}
      </Container>
    </>
  )
}

export default FaucetIndex
