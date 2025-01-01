import { NextResponse } from "next/server";
import { getCoinData } from "../../_services/coin";

export async function GET(req) {
  try {
    const results = await getCoinData();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing coins.",
      },
      { status: 500 }
    );
  }
}
