"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { blockchain as db } from "../_config/db/db";
import {
  listAllBlockchains,
  getDefiMktOverview,
  getBlockchainTvlForSlug as getBlockchainTvlForSlugSql,
  getBlockchainTvlChngForSlug as getBlockchainTvlChngForSlugSql,
  getBlockchainCoinMktcapForSlug as getBlockchainCoinMktcapForSlugSql,
  getBlockchainCoinMktcapChngForSlug as getBlockchainCoinMktcapChngForSlugSql,
} from "../_sql/query";
import { formatToTimestampArray } from "@app/_utilities/helpers";

export const getBlockchainCoinMktcapChngForSlug = nextCache(
  cache(async (slug) => {
    try {
      const [results, metadata] = await db.query(
        getBlockchainCoinMktcapChngForSlugSql,
        {
          replacements: {
            slug,
          },
        }
      );
      return results[0];
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error fetching blockchain coin mktcap chng data for ${slug}`
      );
    }
  }),
  [`getBlockchainCoinMktcapChngForSlug`],
  { revalidate: 28800 }
);

export const getBlockchainCoinMktcapForSlug = nextCache(
  cache(async (slug, period) => {
    try {
      const [results, metadata] = await db.query(
        getBlockchainCoinMktcapForSlugSql,
        {
          replacements: {
            slug,
            periodLimit: period,
          },
        }
      );
      const formattedResults = formatToTimestampArray(results);
      return formattedResults;
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching blockchain coin mktcap data for ${slug}`);
    }
  }),
  [`getBlockchainCoinMktcapForSlug`],
  { revalidate: 28800 }
);

export const getBlockchainTvlChngForSlug = nextCache(
  cache(async (slug) => {
    try {
      const [results, metadata] = await db.query(
        getBlockchainTvlChngForSlugSql,
        {
          replacements: {
            slug,
          },
        }
      );
      return results[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching blockchain tvl chng data for ${slug}`);
    }
  }),
  [`getBlockchainTvlChngForSlug`],
  { revalidate: 28800 }
);

export const getBlockchainTvlForSlug = nextCache(
  cache(async (slug, period) => {
    try {
      const [results, metadata] = await db.query(getBlockchainTvlForSlugSql, {
        replacements: {
          slug,
          periodLimit: period,
        },
      });
      const formattedResults = formatToTimestampArray(results);
      return formattedResults;
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching blockchain tvl data for ${slug}`);
    }
  }),
  [`getBlockchainTvlForSlug`],
  { revalidate: 28800 }
);

export const getBlockchains = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(listAllBlockchains);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all blockchain data");
    }
  }),
  ["getBlockchains"],
  { revalidate: 28800 }
);

export const getBlockchainMktOverview = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getDefiMktOverview);
      const formattedResults = formatToTimestampArray(results);
      return formattedResults;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching blockchain market overview data");
    }
  }),
  ["getBlockchainOverview"],
  { revalidate: 28800 }
);
