import { getDictionary } from "@app/[lang]/dictionaries";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components";
import {
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Suspense } from "react";
import ChatbotInterface from "@app/_components/widgets/ChatbotInterface/ChatbotInterface";

export const metadata = {
  title: "Knowledge Vault - AI Assistant | TokenClan",
  description: "Get instant answers about cryptocurrency, blockchain, and DeFi from our AI-powered knowledge vault.",
};

export default async function KnowledgeVaultPage({ params }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h3" align="center" mb={2}>
            Knowledge Vault
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" mb={4}>
            Ask our AI assistant anything about cryptocurrency, blockchain technology, DeFi, and market analysis.
          </Typography>
        </Grid>
        <Grid size={12}>
          <JumboCard
            contentWrapper
            contentSx={{ p: 0, height: "70vh" }}
          >
            <Suspense fallback={<div>Loading chatbot...</div>}>
              <ChatbotInterface />
            </Suspense>
          </JumboCard>
        </Grid>
      </Grid>
    </Container>
  );
}