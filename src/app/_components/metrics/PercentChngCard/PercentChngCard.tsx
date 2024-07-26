"use client";
import { VisitsChart } from "@app/_components/charts/VisitsChart";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import React from "react";

const PercentChngCard = ({
  title,
  value,
  period,
}: {
  title: React.ReactNode;
  value: number;
  period: "day" | "week" | "month";
}) => {
  const outcome = value > 0 ? true : false;
  let periodWording: string = "Today";
  switch (period) {
    case "week":
      periodWording = "This Week";
      break;
    case "month":
      periodWording = "This Month";
      break;
    default:
      break;
  }

  return (
    <JumboCard
      title={
        <Typography
          variant={"h6"}
          mb={0}
          sx={{ fontSize: 12, color: "common.white", letterSpacing: 1.5 }}
        >
          {title}
        </Typography>
      }
      sx={{ color: "common.white" }}
      bgcolor={outcome ? ["#23BCBA"] : ["#EF5350"]}
    >
      <Div
        sx={{
          p: 3,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          position: "absolute",
        }}
      >
        <Typography variant={"h2"} color={"common.white"}>
          {`${value}%`}
        </Typography>
        <Typography variant={"h6"} color={"common.white"} mb={0}>
          {`${outcome ? "UP" : "DOWN"} ${periodWording}`}
        </Typography>
      </Div>
      <VisitsChart color="rgba(239, 83, 80, 0.8)" market={outcome} />
    </JumboCard>
  );
};

export default PercentChngCard;
