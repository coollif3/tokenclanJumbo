"use server";

import { cache } from "react";
import { blockchain as db } from "../_config/db/db";

const listBlockchains = cache(async () => {
  try {
    const [results, metadata] = await db.query(
      "SELECT bc.id, bc.name AS blockchain, bc.slug, bc.coin_id, c.symbol AS gas_coin, bc.createdAt FROM blockchains AS bc INNER JOIN coins AS c ON bc.coin_id = c.id; "
    );
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all blockchain data");
  }
});

export { listBlockchains };
