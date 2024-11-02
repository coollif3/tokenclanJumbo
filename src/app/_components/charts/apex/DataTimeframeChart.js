"use client";
import { Grid, ButtonGroup, Button, Box, Typography } from "@mui/material";
import Chart from "@app/_components/charts/apex/Chart";
import { useEffect, useState } from "react";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { useSearchParams } from "next/navigation";
import { getBlockchainNameForSlug } from "@app/_services/blockchain";
import { getExchangeNameFor } from "@app/_services/exchange";

export default function DataTimeframeChart({
  slug,
  dataFunc,
  chartConfig,
  chartType,
}) {
  const { theme } = useJumboTheme();
  const [timeframe, setTimeframe] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const searchParams = useSearchParams();
  const compareToSlug = searchParams.get("compareTo");

  useEffect(() => {
    async function fetchData() {
      const seriesData = await dataFunc(slug, timeframe);
      if (compareToSlug !== null) {
        let array = compareToSlug.split(",");
        const dataCompareArray = await Promise.allSettled(
          array.map((slug) => dataFunc(slug, timeframe))
        );
        setCompareData(dataCompareArray.map((result) => result.value));
        const slugNameArray = await Promise.allSettled(
          array.map((slug) => {
            if (chartType === "blockchain") {
              // console.log("blockchain logic");
              return getBlockchainNameForSlug(slug);
            } else {
              // it is exchange
              // console.log("exchange logic");
              return getExchangeNameFor(slug);
            }
          })
        );
        chartConfig.slugtooltipSeriesArray = slugNameArray
          .map((result) => result.value)
          .map((x) => x.name);
      }

      setChartData(seriesData);
    }

    fetchData();
  }, [slug, timeframe, dataFunc, compareToSlug, chartType]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <Grid container spacing={3.75} sx={{ mb: 3 }}>
      <Grid item xs={12}>
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
              sx={{
                "&:hover": {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.text.link,
                },
              }}
            >
              Month
            </Button>
            <Button
              variant={timeframe === 90 ? "contained" : "outlined"}
              onClick={() => handleTimeframeChange(90)}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.text.link,
                },
              }}
            >
              Quarter
            </Button>
            <Button
              variant={timeframe === 365 ? "contained" : "outlined"}
              onClick={() => handleTimeframeChange(365)}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.text.link,
                },
              }}
            >
              Year
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Chart
          series={chartData}
          config={chartConfig}
          compareSeries={compareData}
        />
      </Grid>
    </Grid>
  );
}
