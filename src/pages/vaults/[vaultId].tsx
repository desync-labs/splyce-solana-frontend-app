import { Container } from "@mui/material";
import { VaultProvider } from "@/context/vaultDetail";
import { VaultBreadcrumbs } from "@/components/Base/Breadcrumbs/StyledBreadcrumbs";
import VaultPositionStats from "@/components/Vaults/Detail/VaultPositionStats";
import VaultDetailForm from "@/components/Vaults/Detail/Forms";
import VaultDetailInfoTabs from "@/components/Vaults/Detail/Tabs/InfoTabs";
import VaultLockCalculatorBlock from "@/components/Vaults/Detail/VaultLockCalculatorBlock";

const VaultDetailPage = () => {
  return (
    <VaultProvider>
      <Container>
        <VaultBreadcrumbs />
        <VaultPositionStats />
        <VaultLockCalculatorBlock />
        <VaultDetailForm />
        <VaultDetailInfoTabs />
      </Container>
    </VaultProvider>
  );
};

export default VaultDetailPage;
