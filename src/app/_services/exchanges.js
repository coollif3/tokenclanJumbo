"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import {
  listAllExchanges,
  globalVolumeOverview,
  getExchangeVolumeBySlug,
} from "../_sql/query";

export const listExchangeVolumeFor = nextCache(
  cache(async (slug, period) => {
    try {
      const [results, metadata] = await db.query(getExchangeVolumeBySlug, {
        replacements: { slug, periodLimit: +period },
      });
      return results;
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching exchange volume for slug ${slug} data`);
    }
  }),
  ["listExchangeVolumeForSlug"],
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
  ["listExchanges"],
  { revalidate: 28800 }
);

export const volumeMktOverview = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(globalVolumeOverview);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching volume market overview data");
    }
  }),
  ["getVolumeOverview"],
  { revalidate: 28800 }
);
