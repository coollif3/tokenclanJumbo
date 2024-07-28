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
  getBlockchainRatioForSlug as getBlockchainRatioForSlugSql,
  getBlockchainRatioChngForSlug as getBlockchainRatioChngForSlugSql,
  getDefiMktOverviewChng as getDefiMktOverviewChngSql,
  getBlockchainName as getBlockchainNameSql,
} from "../_sql/query";
import { formatToTimestampArray } from "@app/_utilities/helpers";

export const getBlockchainRatioChngForSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        const [results, metadata] = await db.query(
          getBlockchainRatioChngForSlugSql,
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
          `Error fetching blockchain mktcap/tvl chng data for ${slug}`
        );
      }
    }),
    [`getBlockchainRatioChngForSlug-${slug}`],
    {
      revalidate: 28800,
      tags: [`blockchain-${slug}`],
    }
  );

  return await getData(slug);
};

export const getBlockchainRatioForSlug = async (slug, period) => {
  const getData = nextCache(
    cache(async (slug, period) => {
      try {
        const [results, metadata] = await db.query(
          getBlockchainRatioForSlugSql,
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
        throw new Error(
          `Error fetching blockchain mktcap/Tvl ratio for ${slug}`
        );
      }
    }),
    [`getBlockchainRatioForSlug-${slug}-${period}`],
    {
      revalidate: 28800,
      tags: [`blockchain-${slug}-${period}`],
    }
  );
  return await getData(slug, parseInt(period));
};

export const getBlockchainCoinMktcapChngForSlug = async (slug) => {
  const getData = nextCache(
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
    [`getBlockchainCoinMktcapChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`blockchain-${slug}`] }
  );
  return await getData(slug);
};

export const getBlockchainCoinMktcapForSlug = async (slug, period) => {
  const getData = nextCache(
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
        throw new Error(
          `Error fetching blockchain coin mktcap data for ${slug}`
        );
      }
    }),
    [`getBlockchainCoinMktcapForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`blockchain-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};

export const getBlockchainTvlChngForSlug = async (slug) => {
  const getData = nextCache(
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
    [`getBlockchainTvlChngForSlug-${slug}`],
    { revalidate: 28800, tags: [`blockchain-${slug}`] }
  );
  return await getData(slug);
};

export const getBlockchainTvlForSlug = async (slug, period) => {
  const getData = nextCache(
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
    [`getBlockchainTvlForSlug-${slug}-${period}`],
    { revalidate: 28800, tags: [`blockchain-${slug}-${period}`] }
  );
  return await getData(slug, parseInt(period));
};

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

export const getBlockchainNameForSlug = async (slug) => {
  const getData = nextCache(
    cache(async (slug) => {
      try {
        console.log("inside function");
        console.log(slug);
        const [results, metadata] = await db.query(getBlockchainNameSql, {
          replacements: {
            slug,
          },
        });
        return results[0];
      } catch (error) {
        console.log(error);
        throw new Error(`Error fetching blockchain name for ${slug}`);
      }
    }),
    [`getBlockchainNameForSlug-${slug}`],
    {
      revalidate: 28800,
      tags: ["getBlockchainNameForSlug", `blockchain-${slug}}`],
    }
  );
  return await getData(slug);
};

export const getBlockchainMktOverviewChng = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getDefiMktOverviewChngSql);
      return results[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching blockchain market overiew chng data`);
    }
  }),
  [`getBlockchainOverviewChng`],
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
