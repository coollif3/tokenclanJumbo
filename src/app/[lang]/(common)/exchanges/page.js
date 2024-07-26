import { listExchanges, volumeMktOverview } from "@app/_services/exchanges";
import ExchangeDataTable from "@app/_components/widgets/ExchangeTableListing/ExchangeDataTable";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import { Container, Grid } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

const chartConfig = {
  chartTitle: "Total Volume 24hr",
  tooltipSeries: "Volume 24hr",
  yaxisTitle: "24hr Volume USD (Billions)",
};

const ExchangesPage = async () => {
  const results = await listExchanges();
  const chartSeries = await volumeMktOverview();
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
      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <GlobalCharts series={chartSeries} config={chartConfig} />
        </Grid>
        <Grid item xs={12}>
          <ExchangeDataTable rows={results} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExchangesPage;
