"use client";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import Image from "next/image";
import { numberWithCommas } from "@app/_utilities/helpers";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

const CurrentMarketCard = ({
  subheader,
  value,
  prefixUnit,
  roundedDigit,
}: {
  subheader: React.ReactNode;
  value: string;
  prefixUnit?: string;
  roundedDigit: number;
}) => {
  const { theme } = useJumboTheme();
  const marketValue = (+value).toFixed(roundedDigit);
  const formattedValue = numberWithCommas(marketValue);
  return (
    <JumboCard
      avatar={
        <Image
          alt={""}
          width={38}
          height={38}
          src={`${ASSET_IMAGES}/dashboard/filesIcon.svg`}
        />
      } // Provide a default or placeholder value
      bgimage={null} // Provide a default or placeholder value
      textColor="common.white" // Provide a default or placeholder value
      bgcolor={[theme.palette.primary.main]}
      title={
        <Typography color={"common.white"} variant={"h5"} mb={0.5}>
          {`${prefixUnit} ${formattedValue} `}
        </Typography>
      }
      subheader={
        <Typography color={"common.white"} variant={"h5"} mb={0.5}>
          {subheader}
        </Typography>
      }
      // bgcolor={["#5DCBA6"]}
      contentSx={{ p: 3, height: 56 }}
      action={null}
      contentWrapper
    >
      <Typography variant={"body1"} color={"common.white"}></Typography>
    </JumboCard>
  );
};

export default CurrentMarketCard;
