"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { blockchain as db } from "../_config/db/db";
import { listAllBlockchains, getDefiMktOverview } from "../_sql/query";

export const listBlockchains = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(listAllBlockchains);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all blockchain data");
    }
  }),
  ["listBlockchains"],
  { revalidate: 28800 }
);

export const blockchainMktOverview = nextCache(
  cache(async () => {
    try {
      const [results, metadata] = await db.query(getDefiMktOverview);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching blockchain market overview data");
    }
  }),
  ["getBlockchainOverview"],
  { revalidate: 28800 }
);
