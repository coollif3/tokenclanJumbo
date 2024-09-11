"use client";
import { Grid, ButtonGroup, Button, Box, Typography } from "@mui/material";
import { getBlockchainTvlForSlug } from "@app/_services/blockchain";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import { useEffect, useState } from "react";

const tvlChartConfig = {
  chartTitle: "TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function TvlChart({ slug }) {
  const [timeframe, setTimeframe] = useState(30);
  const [tvlData, setTvlData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tvlData = await getBlockchainTvlForSlug(slug, timeframe);
      setTvlData(tvlData);
    }

    fetchData();
  }, [slug, timeframe]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <Grid container spacing={3.75} sx={{ mt: 3, mb: 3 }}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2, // Optional: Add top margin
            mb: 2, // Optional: Add bottom margin
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonGroup
              variant="outlined"
              size="small"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => handleTimeframeChange(30)}>Daily</Button>
              <Button onClick={() => handleTimeframeChange(90)}>Weekly</Button>
              <Button onClick={() => handleTimeframeChange(365)}>
                Monthly
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" gutterBottom sx={{ mr: 2 }}>
              Timeframe
            </Typography>
            <ButtonGroup
              variant="outlined"
              size="small"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => handleTimeframeChange(30)}>Month</Button>
              <Button onClick={() => handleTimeframeChange(90)}>Quarter</Button>
              <Button onClick={() => handleTimeframeChange(365)}>Year</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <GlobalCharts series={tvlData} config={tvlChartConfig} />
      </Grid>
    </Grid>
  );
}
