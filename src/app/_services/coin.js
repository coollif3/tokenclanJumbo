"use server";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import { formatToTimestampArray } from "@app/_utilities/helpers";
import {
  getCoinProfileBySlug,
  getCoinName as getCoinNameSql,
  getCoinNameFromExchangeSlug as getCoinNameFromExchangeSlugSql,
  getAllExchangeCoinSlug as getAllExchangeCoinSlugSql,
} from "../_sql/query";

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

export const getCoinNameFor = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(getCoinNameSql, {
          replacements: { slug },
        });

        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching exchange coin name for slug ${slug}`);
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
  ["getAllExchangeCoinSlug"],
  { revalidate: 86400 }
);
