"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ExchangeCharts({ series, config }) {
  const chartConfig = {
    options: {
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
            return `${val.toFixed(0)}`;
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
            return "$ " + formattedValue;
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
