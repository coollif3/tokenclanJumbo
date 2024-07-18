import { Typography } from "@mui/material";
import DataTable from "../../../_components/widgets/BlockchainTableListing/DataTable";
import { listBlockchains } from "../../../_services/blockchain";

const BlockchainsPage = async () => {
  const listingRows = await listBlockchains();
  return (
    <main>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Hello Blockchains Page!
      </Typography>
      <DataTable rows={listingRows} />
    </main>
  );
};

export default BlockchainsPage;
