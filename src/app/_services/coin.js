"use server";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import { coin as dbc } from "../_config/db/db";
import { formatToTimestampArray } from "@app/_utilities/helpers";
import {
  getCoinProfileBySlug,
  getCoinName as getCoinNameSql,
  getCoinNameFromExchangeSlug as getCoinNameFromExchangeSlugSql,
  getAllExchangeCoinSlug as getAllExchangeCoinSlugSql,
  getCommonCoinProfileBySlug,
  getCommonCoinSlug as getCommonCoinSlugSql,
  getCoinSlug as getCoinSlugSql,
  getCoinProfile as getCoinProfileSql,
  listAllCoins,
  getCoinSlugUsingExchngSlug as getCoinSlugUsingExchngSlugSql,
  getCoinSlugUsingBlkChainSlug as getCoinSlugUsingBlkChainSlugSql,
  getCoinPriceChngForSlug as getCoinPriceChngForSlugSql,
  getCoinPriceForSlug as getCoinPriceForSlugSql,
} from "../_sql/query";

// Get coin profile data for a given slug
export const getCoinProfileFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await dbc.query(getCoinProfileSql, {
          replacements: { slug },
        });

        return results;
      } catch (error) {
        console.log(error);
        throw new Error(
          `Error fetching coin profile for slug ${slug}`
        );
      }
    }),
    [`getCoinProfileForSlug-${slug}`],
    { revalidate: 86400, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

export const getCoinNameFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await dbc.query(getCoinNameSql, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin name for slug ${slug}`);
      }
    }),
    [`getCoinNameForSlug-${slug}`],
    { revalidate: 28800, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

export const getCoinNameFromExchangeSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(
          getCoinNameFromExchangeSlugSql,
          {
            replacements: { slug },
          }
        );

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin data from exchange slug ${slug}`);
      }
    }),
    [`getCoinNameFromExchangeSlug-${slug}`],
    { revalidate: 28800, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

export const getAllCoinSlug = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getAllExchangeCoinSlugSql);

      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all exchange coin slug data");
    }
  }),
  ["getAllCoinSlug"],
  { revalidate: 86400 }
);

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

// Get common coin profile data for a given slug
export const getCommonCoinProfileFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getCommonCoinProfileBySlug, {
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
    [`getCommonCoinProfileForSlug-${slug}`],
    { revalidate: 86400, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

// Get common coin slug data
export const getCommonCoinSlug = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getCommonCoinSlugSql);

      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all common coins slug data");
    }
  }),
  ["getCommonCoinSlug"],
  { revalidate: 86400 }
);

// Get coin data
export const getCoinData = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await dbc.query(listAllCoins);

      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all coins data");
    }
  }),
  ["getCoinData"],
  { revalidate: 28800 }
);

// Get coin slug data
export const getCoinSlug = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await dbc.query(getCoinSlugSql);

      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all common coins slug data");
    }
  }),
  ["getCoinSlug"],
  { revalidate: 86400 }
);

export const getCoinSlugUsingExchngSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await dbc.query(getCoinSlugUsingExchngSlugSql, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin slug using exchange slug ${slug}`);
      }
    }),
    [`getCoinSlugUsingExchngSlug-${slug}`],
    { revalidate: 86400, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

export const getCoinSlugUsingBlkChainSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await dbc.query(getCoinSlugUsingBlkChainSlugSql, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin slug using blockchain slug ${slug}`);
      }
    }),
    [`getCoinSlugUsingBlkChainSlug-${slug}`],
    { revalidate: 86400, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
}

// **need to create standalone view table for coin price chng data and alter the query for optimisation
export const getCoinPriceChngForSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await dbc.query(getCoinPriceChngForSlugSql, {
          replacements: { slug },
        }
        );

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin price chng data for ${slug}`);
      }
    }),
    [`getCoinPriceChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`coin-${slug}`] }
  );
  return await getData(slug);
};

// **need to create standalone view table for coin price data and alter the query for optimisation
export const getCoinPriceForSlug = async (slug, period) => {
  const getData = nextCache(
    cache(async (slug, period) => {
      try {
        const [results, metadata] = await dbc.query(getCoinPriceForSlugSql, {
          replacements: {
            slug,
            periodLimit: period,
          },
        });
        const formattedResults = formatToTimestampArray(results);

        return formattedResults;
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching coin price data for ${slug}`);
      }
    }),
    [`getCoinPriceForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`coin-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};