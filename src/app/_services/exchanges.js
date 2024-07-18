"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { exchange as db } from "../_config/db/db";
import { listAllExchanges } from "../_sql/query";

const listExchanges = nextCache(
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

export { listExchanges };
