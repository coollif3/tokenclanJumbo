import { NextResponse } from "next/server";
import { blockchainMktOverview } from "@app/_services/blockchain";

export async function GET(req) {
  try {
    const results = await blockchainMktOverview();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in displaying blockchain market overview.",
      },
      { status: 500 }
    );
  }
}
