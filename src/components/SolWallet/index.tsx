import { useCallback, useState } from 'react'
import { Wallet, useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Typography, styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { encodeStr } from '@/utils/common'
import SelectWalletModal from './SelectWalletModal'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import WalletInfoModal from '@/components/SolWallet/WalletInfoModal'

const WalletInfo = styled(FlexBox)`
  justify-content: flex-end;
  width: fit-content;
  gap: 0;
  background-color: #072a40;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px 16px;

  & img {
    margin-right: 8px;
  }

  & svg {
    margin-right: -8px;
  }
`

const SolWallet = () => {
  const { wallets, select, connected, wallet, disconnect, publicKey } =
    useWallet()
  const { setVisible, visible } = useWalletModal()
  const [isWalletDrawerShown, setIsWalletDrawerShown] = useState(false)

  const handleClose = useCallback(() => setVisible(false), [setVisible])
  const handleOpen = useCallback(() => setVisible(true), [setVisible])

  const handleSelectWallet = (wallet: Wallet) => {
    select(wallet.adapter.name)
    handleClose()
  }

  const handleShowWalletDrawer = () => setIsWalletDrawerShown(true)
  const onClose = () => setIsWalletDrawerShown(false)

  if (connected)
    return (
      <>
        <WalletInfoModal
          wallet={wallet}
          address={publicKey?.toBase58() || ''}
          onDisconnect={disconnect}
          isOpen={isWalletDrawerShown}
          onClose={onClose}
        />
        <FlexBox sx={{ justifyContent: 'flex-end' }}>
          <WalletInfo onClick={handleShowWalletDrawer}>
            {wallet && (
              <img
                src={wallet.adapter.icon}
                width="20px"
                height="20px"
                alt={'wallet'}
              />
            )}
            <Typography>{encodeStr(publicKey?.toBase58(), 4)}</Typography>
            <KeyboardArrowDownRoundedIcon />
          </WalletInfo>
        </FlexBox>
      </>
    )
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountBalanceWalletIcon />
      </IconButton>
      <SelectWalletModal
        wallets={wallets}
        isOpen={visible}
        onClose={handleClose}
        onSelectWallet={handleSelectWallet}
      />
    </>
  )
}

export default SolWallet
