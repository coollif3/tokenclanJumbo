"use client";
import { Grid, ButtonGroup, Button, Box, Typography } from "@mui/material";
import Chart from "@app/_components/charts/apex/Chart";
import { useEffect, useState } from "react";

export default async function DataChart({ slug, dataFunc, chartConfig }) {
  const [timeframe, setTimeframe] = useState(30);
  // const [chartType, setChartType] = useState("daily");
  const [tvlData, setTvlData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tvlData = await dataFunc(slug, timeframe);
      setTvlData(tvlData);
    }

    fetchData();
  }, [slug, timeframe, dataFunc]);

  // useEffect(() => {
  //   async function fetchData() {
  //     let tvlData;
  //     switch (chartType) {
  //       case "daily":
  //         tvlData = await getBlockchainTvlForSlug(slug, 30);
  //         setTvlData(tvlData);
  //         break;
  //       case "weekly":
  //         tvlData = await getBlockchainTvlForSlugWeek(slug, 12);
  //         setTvlData(tvlData);
  //         break;

  //       case "monthly":
  //         tvlData = await getBlockchainTvlForSlugMonth(slug, 6);
  //         setTvlData(tvlData);
  //         break;
  //       default:
  //         break;
  //     }
  //   }

  //   fetchData();
  // }, [slug, chartType]);

  // const handleChartTypeChange = (chartType) => {
  //   setChartType(chartType);
  //   setTimeframe(30);
  // };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // setChartType("daily");
  };

  return (
    <Grid container spacing={3.75} sx={{ mt: 3, mb: 3 }}>
      <Grid item xs={12}>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
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
      </Grid>
      <Grid item xs={12}>
        <Chart series={tvlData} config={chartConfig} />
      </Grid>
    </Grid>
  );
}
