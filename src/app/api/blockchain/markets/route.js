import { NextResponse } from "next/server";
import {
  getBlockchainMktOverview,
  getBlockchainMktOverviewChng,
} from "@app/_services/blockchain";

export async function GET(req) {
  try {
    const mktData = await getBlockchainMktOverview();
    const chngData = await getBlockchainMktOverviewChng();

    return NextResponse.json({ mktData, chngData }, { status: 200 });
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
