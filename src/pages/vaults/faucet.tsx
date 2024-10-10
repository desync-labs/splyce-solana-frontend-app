import { FC, useEffect, useState } from "react";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import { faucetTestToken } from "@/utils/TempSdkMethods";
import BasePageHeader from "@/components/Base/PageHeader";
import VaultsNestedNav from "@/components/Vaults/NestedNav";
import { BaseInfoIcon } from "@/components/Base/Icons/StyledIcons";
import { BaseErrorBox, BaseInfoBox } from "@/components/Base/Boxes/StyledBoxes";

const TEST_TOKEN_PUBLIC_KEY_DEV = new PublicKey(
  "4dCLhR7U8PzwXau6qfjr73tKgp5SD42aLbyo3XQNzY4V"
);
const TEST_TOKEN_PUBLIC_KEY_MAINNET = new PublicKey(
  "4N37FD6SU35ssX6yTu2AcCvzVbdS6z3YZTtk5gv7ejhE"
);

const FaucetIndex: FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const mintTokenPubKey =
    process.env.NEXT_PUBLIC_ENV === "prod"
      ? TEST_TOKEN_PUBLIC_KEY_MAINNET
      : TEST_TOKEN_PUBLIC_KEY_DEV;

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleGetTestTokens = async () => {
    if (!publicKey || !anchorWallet) {
      return;
    }
    setLoading(true);
    try {
      const res = await faucetTestToken(
        publicKey,
        mintTokenPubKey,
        anchorWallet
      );
      console.log("Tx signature:", res);
      setSuccessMessage(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <VaultsNestedNav />
      <Container>
        <BasePageHeader title="Faucet" />
        <Button
          variant="gradient"
          sx={{ marginTop: "24px" }}
          onClick={handleGetTestTokens}
          disabled={loading || successMessage || !publicKey || !anchorWallet}
        >
          {loading ? (
            <CircularProgress sx={{ color: "#0D1526" }} size={20} />
          ) : (
            "Get test tokens"
          )}
        </Button>
        {successMessage && (
          <BaseInfoBox sx={{ marginTop: "24px" }}>
            <BaseInfoIcon />
            <Typography>You have received 100 Test Splyce USD</Typography>
          </BaseInfoBox>
        )}
        {errorMessage && (
          <BaseErrorBox sx={{ marginTop: "24px", maxWidth: "400px" }}>
            <BaseInfoIcon />
            <Typography>{errorMessage}</Typography>
          </BaseErrorBox>
        )}
      </Container>
    </>
  );
};

export default FaucetIndex;
