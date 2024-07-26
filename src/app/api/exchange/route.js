import { NextResponse } from "next/server";
import { getExchanges } from "../../_services/exchanges";

export async function GET(req) {
  try {
    const results = await getExchanges();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing exchanges.",
      },
      { status: 500 }
    );
  }
}
