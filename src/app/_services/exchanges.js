"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import {
  listAllExchanges,
  globalVolumeOverview,
  getExchangeVolumeBySlug,
  getExchangeVolumeChngBySlug,
} from "../_sql/query";

import { formatToTimestampArray } from "@app/_utilities/helpers";

export const getExchangeVolumeFor = nextCache(
  cache(async (slug, period) => {
    try {
      const [results, metadata] = await db.query(getExchangeVolumeBySlug, {
        replacements: { slug, periodLimit: period },
      });

      const formattedResults = formatToTimestampArray(results);

      return formattedResults;
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching exchange volume for slug ${slug} data`);
    }
  }),
  ["getExchangeVolumeForSlug"],
  { revalidate: 28800 }
);

export const getExchangeVolumeChngFor = nextCache(
  cache(async (slug) => {
    try {
      const [results, metadata] = await db.query(getExchangeVolumeChngBySlug, {
        replacements: { slug },
      });
      return results[0];
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error fetching exchange volume change for slug ${slug} data`
      );
    }
  }),
  ["getExchangeVolumeChngForSlug"],
  { revalidate: 28800 }
);

export const listExchanges = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(listAllExchanges);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all exchanges data");
    }
  }),
  ["getExchanges"],
  { revalidate: 28800 }
);

export const volumeMktOverview = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(globalVolumeOverview);
      const formattedResults = formatToTimestampArray(results);

      return formattedResults;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching volume market overview data");
    }
  }),
  ["getVolumeMarketOverview"],
  { revalidate: 28800 }
);
