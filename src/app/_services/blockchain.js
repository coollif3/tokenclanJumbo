"use server";

import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import { blockchain as db } from "../_config/db/db";
import { listAllBlockchains } from "../_sql/query";

const listBlockchains = nextCache(
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

export { listBlockchains };
