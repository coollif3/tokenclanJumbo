import { NextResponse } from "next/server";
import { blockchain as db } from "../../_config/db/db";
import query from "../../_sql/query";

export async function GET(req, { params }) {
  try {
    const [results, metadata] = await db.query(query.listAllBlockchains);
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
