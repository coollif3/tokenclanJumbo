import { NextResponse } from "next/server";
import { blockchain as db } from "../../_config/db/db";

export async function GET(req, { params }) {
  try {
    const [results, metadata] = await db.query(
      "SELECT bc.id, bc.name AS blockchain, bc.slug, bc.coin_id, c.symbol AS gas_coin, bc.createdAt FROM blockchains AS bc INNER JOIN coins AS c ON bc.coin_id = c.id; "
    );
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing blockchains.",
      },
      { status: 500 }
    );
  }
}
