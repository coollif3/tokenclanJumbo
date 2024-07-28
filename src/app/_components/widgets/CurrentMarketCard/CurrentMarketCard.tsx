"use client";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import Image from "next/image";
import { numberWithCommas } from "@app/_utilities/helpers";

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
  const marketValue = (+value).toFixed(roundedDigit);
  const formattedValue = numberWithCommas(marketValue);
  return (
    <JumboCard
      bgcolor={["#5DCBA6"]}
      contentSx={{ p: 3, height: 145 }}
      contentWrapper
    >
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <Image
          alt={""}
          width={48}
          height={48}
          src={`${ASSET_IMAGES}/dashboard/filesIcon.svg`}
        />
        <Div sx={{ ml: 2, flex: 1 }}>
          <Typography color={"common.white"} variant={"h2"} mb={0.5}>
            {`${prefixUnit} ${formattedValue} `}
          </Typography>
          <Typography color={"common.white"} variant={"h5"} mb={0}>
            {subheader}
          </Typography>
        </Div>
      </Div>
    </JumboCard>
  );
};

export default CurrentMarketCard;
