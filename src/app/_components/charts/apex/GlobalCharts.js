"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function GlobalCharts({ series, config }) {
  const chartConfig = {
    options: {
      colors: ["#5DCBA6"],
      chart: {
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: config.chartTitle,
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            switch (config.yaxisFormatter) {
              case "THOUSAND_SEPARATOR":
                return `${val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              case "BILLION_UNIT":
                return `${(val / 1000000000).toFixed(0)}`;
              default:
                return val;
            }
          },
        },
        title: {
          text: config.yaxisTitle,
        },
      },
      xaxis: {
        type: "datetime",
        labels: { format: "dd MMM yy" },
      },
      tooltip: {
        shared: false,
        x: {
          format: "dd MMM yy",
        },
        y: {
          formatter: function (val) {
            const formattedValue = new Intl.NumberFormat("en-US").format(val);
            switch (config.yaxisTooltipFormatterLabel) {
              case "DOLLAR":
                return "$ " + formattedValue;
              case "PERCENTAGE":
                return formattedValue + "%";
              case "BITCOIN":
                return formattedValue + " BTC";
              default:
                return formattedValue;
            }
          },
        },
      },
    },

    series: [
      {
        name: config.tooltipSeries,
        data: series,
      },
    ],
  };

  return (
    <ApexChart
      type="area"
      options={chartConfig.options}
      series={chartConfig.series}
      width="100%"
      height={520}
    />
  );
}
