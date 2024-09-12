"use client";
import {
  Grid,
  ButtonGroup,
  Button,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlForSlugWeek,
  getBlockchainTvlForSlugMonth,
} from "@app/_services/blockchain";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import { useEffect, useState } from "react";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

const tvlChartConfig = {
  chartTitle: "TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function TvlChart({ slug }) {
  const [timeframe, setTimeframe] = useState(30);
  const [chartType, setChartType] = useState("daily");
  const [tvlData, setTvlData] = useState([]);
  const { theme } = useJumboTheme();

  useEffect(() => {
    async function fetchData() {
      const tvlData = await getBlockchainTvlForSlug(slug, timeframe);
      setTvlData(tvlData);
    }

    fetchData();
  }, [slug, timeframe]);

  useEffect(() => {
    async function fetchData() {
      let tvlData;
      switch (chartType) {
        case "daily":
          tvlData = await getBlockchainTvlForSlug(slug, 30);
          setTvlData(tvlData);
          break;
        case "weekly":
          tvlData = await getBlockchainTvlForSlugWeek(slug, 12);
          setTvlData(tvlData);
          break;

        case "monthly":
          tvlData = await getBlockchainTvlForSlugMonth(slug, 6);
          setTvlData(tvlData);
          break;
        default:
          break;
      }
    }

    fetchData();
  }, [slug, chartType]);

  const handleChartTypeChange = (chartType) => {
    setChartType(chartType);
    setTimeframe(30);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    setChartType("daily");
  };

  return (
    <Grid container spacing={3.75} sx={{ mt: 3, mb: 3 }}>
      <ThemeProvider theme={theme}>
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
                color="primary"
              >
                <Button
                  variant={chartType === "daily" ? "contained" : "outlined"}
                  onClick={() => handleChartTypeChange("daily")}
                >
                  Daily
                </Button>
                <Button
                  variant={chartType === "weekly" ? "contained" : "outlined"}
                  onClick={() => handleChartTypeChange("weekly")}
                >
                  Weekly
                </Button>
                <Button
                  variant={chartType === "monthly" ? "contained" : "outlined"}
                  onClick={() => handleChartTypeChange("monthly")}
                >
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
                <Button
                  variant={timeframe === 30 ? "contained" : "outlined"}
                  onClick={() => handleTimeframeChange(30)}
                >
                  Month
                </Button>
                <Button
                  variant={timeframe === 90 ? "contained" : "outlined"}
                  onClick={() => handleTimeframeChange(90)}
                >
                  Quarter
                </Button>
                <Button
                  variant={timeframe === 365 ? "contained" : "outlined"}
                  onClick={() => handleTimeframeChange(365)}
                >
                  Year
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <GlobalCharts series={tvlData} config={tvlChartConfig} />
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
