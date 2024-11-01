"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getBlockchainNameForSlug } from "@app/_services/blockchain";
import { getExchangeNameFor } from "@app/_services/exchange";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CompareTimeSeriesBox({ slugData, boxType }) {
  const { theme } = useJumboTheme();
  const searchParams = useSearchParams();
  const compareToSlug = searchParams.get("compareTo");

  const [multiSelectSlugName, setMultiSelectSlugName] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  async function getSlugName(array) {
    if (boxType === "blockchain") {
      const slugNameArray = await Promise.allSettled(
        array.map((slug) => getBlockchainNameForSlug(slug))
      );

      return slugNameArray.map((result) => result.value).map((x) => x.name);
    } else if (boxType === "exchange") {
      const slugNameArray = await Promise.allSettled(
        array.map((slug) => getExchangeNameFor(slug))
      );

      return slugNameArray.map((result) => result.value).map((x) => x.name);
    } else {
      return;
    }
  }

  const handleOnChange = async (e) => {
    const newValues = e.target.value;

    if (boxType === "blockchain") {
      if (newValues.length <= 4) {
        let data = newValues
          .map((name) => slugData.find((item) => item.name === name))
          .map((x) => x.slug);
        const queryString = data.length
          ? `?compareTo=${data.join(",")}`
          : pathName;
        router.push(queryString, undefined, { shallow: true });
        setMultiSelectSlugName(e.target.value);
      } else {
        return;
      }
    } else if (boxType === "exchange") {
      if (newValues.length <= 4) {
        let data = newValues
          .map((name) => slugData.find((item) => item.exchange === name))
          .map((x) => x.slug);
        const queryString = data.length
          ? `?compareTo=${data.join(",")}`
          : pathName;
        router.push(queryString, undefined, { shallow: true });
        setMultiSelectSlugName(e.target.value);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (boxType === "blockchain") {
        if (compareToSlug !== null) {
          getBlockchainNameForSlug(compareToSlug);
          let array = compareToSlug.split(",");
          setMultiSelectSlugName(await getSlugName(array));
        }
      } else if (boxType === "exchange") {
        if (compareToSlug !== null) {
          getExchangeNameFor(compareToSlug);
          let array = compareToSlug.split(",");
          setMultiSelectSlugName(await getSlugName(array));
        }
      } else {
        return;
      }
    }
    fetchData();
  }, [compareToSlug, boxType]);

  const menuOptions =
    boxType === "blockchain"
      ? slugData.map((item, index) => (
          <MenuItem
            key={index}
            value={item.name}
            sx={{
              color: theme.palette.text.link,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              "&:active": { color: theme.palette.primary.main },
            }}
          >
            {item.name}
          </MenuItem>
        ))
      : slugData.map((item, index) => (
          <MenuItem
            key={index}
            value={item.exchange}
            sx={{
              color: theme.palette.text.link,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              "&:active": { color: theme.palette.primary.main },
            }}
          >
            {item.exchange}
          </MenuItem>
        ));

  return (
    <div>
      <FormControl sx={{ my: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Compare</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={multiSelectSlugName}
          onChange={(e) => handleOnChange(e)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {menuOptions}
        </Select>
      </FormControl>
    </div>
  );
}
