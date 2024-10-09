import { ReactNode, useState } from "react";
import Image from "next/image";
import { Wallet } from "@solana/wallet-adapter-react";
import { Box, Button, Drawer, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { BaseDialogCloseIcon } from "@/components/Base/Dialog/BaseDialogTitle";
import { FlexBox } from "@/components/Base/Boxes/StyledBoxes";
import SolanaNetworkIcon from "@/assets/networks/SolanaNetworkIcon";
import EthereumNetworkIcon from "@/assets/networks/EthereumNetworkIcon";
import BinanceNetworkIcon from "@/assets/networks/BinanceNetworkIcon";
import PolygonNetworkIcon from "@/assets/networks/PolygonNetworkIcon";
import IconButton from "@mui/material/IconButton";
import { encodeStr } from "@/utils/common";

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    height: auto;
    min-width: 400px;
    top: 70px;
    right: 20px;
    border-radius: 16px;
  }
`;

const DrawerContent = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  padding: 24px 20px;
`;

const WalletLogoWrapper = styled(Box)`
  position: relative;
  & img {
    border-radius: 50%;
  }
`;

const DisconnectButton = styled(Button)`
  height: 48px;
  font-size: 14px;
  font-weight: 600;
  background: rgba(55, 127, 146, 0.25);
  color: #bbfb5b;
  border-radius: 0;
`;

interface WalletInfoModalProps {
  wallet: Wallet | null;
  address: string;
  onDisconnect: () => void;
  isOpen?: boolean;
  onClose: () => void;
}

type WalletInfo = {
  adaptarName: string | undefined;
  adaptarIcon?: string;
  network: string;
  networkIcon?: string | ReactNode;
  address: string;
};

function getNetworkIcon(network: string): ReactNode | undefined {
  switch (network) {
    case "Solana":
      return <SolanaNetworkIcon />;
    case "Ethereum":
      return <EthereumNetworkIcon />;
    case "Binance":
      return <BinanceNetworkIcon />;
    case "Polgon":
      return <PolygonNetworkIcon />;
  }
}

const WalletInfoModal = ({
  wallet,
  address,
  isOpen = false,
  onClose,
  onDisconnect,
}: WalletInfoModalProps) => {
  const solanaWalletInfo: WalletInfo | undefined = {
    adaptarName: wallet?.adapter.name,
    adaptarIcon: wallet?.adapter.icon,
    network: "Solana",
    networkIcon: getNetworkIcon("Solana"),
    address,
  };

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(
      () => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error("Error copy address: ", err);
      }
    );
  };

  const handleDisConnect = () => {
    onDisconnect();
    onClose();
  };

  return (
    <StyledDrawer anchor={"right"} open={isOpen} onClose={onClose}>
      <BaseDialogCloseIcon aria-label="close" onClick={onClose}>
        <CloseIcon />
      </BaseDialogCloseIcon>

      {solanaWalletInfo && (
        <DrawerContent>
          <WalletLogoWrapper>
            <Image
              src={solanaWalletInfo.adaptarIcon as string}
              rounded="full"
              overflow="hidden"
              width={40}
              height={40}
              alt="wallet icon"
            />
            <Box
              sx={{ position: "absolute" }}
              bottom={"-1px"}
              right={"-1px"}
              width="16px"
              height="16px"
            >
              {typeof solanaWalletInfo.networkIcon === "string" ? (
                <Image
                  src={solanaWalletInfo.networkIcon as string}
                  width={16}
                  height={16}
                  alt="network icon"
                />
              ) : (
                solanaWalletInfo.networkIcon
              )}
            </Box>
          </WalletLogoWrapper>

          <FlexBox sx={{ justifyContent: "center", gap: 0 }}>
            <Typography>{encodeStr(solanaWalletInfo.address, 8)}</Typography>
            <IconButton disabled={copied} onClick={handleCopy}>
              {copied ? (
                <CheckCircleOutlineRoundedIcon
                  sx={{ width: "16px", height: "16px" }}
                />
              ) : (
                <ContentCopyRoundedIcon
                  sx={{ width: "16px", height: "16px" }}
                />
              )}
            </IconButton>
          </FlexBox>
        </DrawerContent>
      )}
      <Box>
        <DisconnectButton fullWidth onClick={handleDisConnect}>
          Disconnect
        </DisconnectButton>
      </Box>
    </StyledDrawer>
  );
};

export default WalletInfoModal;
