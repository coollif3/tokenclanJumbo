"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import {
  listAllExchanges,
  globalVolumeOverview,
  getExchangeVolumeBySlug,
  getExchangeVolumeChngBySlug,
  getExchangeMktcapBySlug,
  getExchangeMktcapChngBySlug,
  getExchangeTvevBySlug,
  getExchangeTvevChngBySlug,
  getCoinProfileBySlug,
  getExchangeProfileBySlug,
  globalVolumeOverviewChng as globalVolumeOverviewChngSql,
  getExchangeName as getExchangeNameSql,
  getAllExchangeCoinSlug as getAllExchangeCoinSlugSql,
} from "../_sql/query";

import { formatToTimestampArray } from "@app/_utilities/helpers";

export const getExchangeTvevChngFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getExchangeTvevChngBySlug, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange tvev chng for slug ${slug} data`
        );
      }
    }),
    [`getExchangeTvevChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`exchange-${slug}`] }
  );
  return await getData(slug);
};

export const getExchangeTvevFor = async (slug, period) => {
  const getData = nextCache(
    cache(async (slug, period) => {
      try {
        const [results, metadata] = await db.query(getExchangeTvevBySlug, {
          replacements: { slug, periodLimit: period },
        });

        const formattedResults = formatToTimestampArray(results);

        return formattedResults;
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange tvev ratio for slug ${slug} data`
        );
      }
    }),
    [`getExchangeTvevForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`exchange-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};

export const getExchangeMktcapChngFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(
          getExchangeMktcapChngBySlug,
          {
            replacements: { slug },
          }
        );

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange marketcap chng for slug ${slug} data`
        );
      }
    }),
    [`getExchangeMktcapChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`exchange-${slug}`] }
  );
  return await getData(slug);
};

export const getExchangeMktcapFor = async (slug, period) => {
  const getData = nextCache(
    cache(async (slug, period) => {
      try {
        const [results, metadata] = await db.query(getExchangeMktcapBySlug, {
          replacements: { slug, periodLimit: period },
        });

        const formattedResults = formatToTimestampArray(results);

        return formattedResults;
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange marketcap for slug ${slug} data`
        );
      }
    }),
    [`getExchangeMktcapForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`exchange-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};

export const getExchangeVolumeFor = async (slug, period) => {
  const getData = nextCache(
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
    [`getExchangeVolumeForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`exchange-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};

export const getExchangeVolumeChngFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(
          getExchangeVolumeChngBySlug,
          {
            replacements: { slug },
          }
        );
        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange volume change for slug ${slug} data`
        );
      }
    }),
    [`getExchangeVolumeChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`exchange-${slug}`] }
  );
  return await getData(slug);
};

export const getExchangeNameFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getExchangeNameSql, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching exchange name for slug ${slug}`);
      }
    }),
    [`getExchangeNameForSlug-${slug}`],
    { revalidate: 28800, tags: [`exchange-${slug}`] }
  );
  return await getData(slug);
};

export const getExchanges = nextCache(
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

export const getVolumeMktOverviewChng = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(globalVolumeOverviewChngSql);

      return results[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching volume market overview chng data");
    }
  }),
  ["getVolumeMarketOverviewChng"],
  { revalidate: 28800 }
);

export const getVolumeMktOverview = nextCache(
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

// Get exchange profile data for a given slug
export const getExchangeProfileFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getExchangeProfileBySlug, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange profile for coin slug ${slug}`
        );
      }
    }),
    [`getExchangeProfileForSlug-${slug}`],
    { revalidate: 86400, tags: [`exchange-${slug}`] }
  );
  return await getData(slug);
};

// Get coin profile data for a given slug
export const getCoinProfileFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getCoinProfileBySlug, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching exchange coin profile for slug ${slug}`
        );
      }
    }),
    [`getCoinProfileForSlug-${slug}`],
    { revalidate: 86400, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

export const getAllExchangeCoinSlug = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getAllExchangeCoinSlugSql);

      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all exchange coin slug data");
    }
  }),
  ["getAllExchangeCoinSlug"],
  { revalidate: 86400 }
);
