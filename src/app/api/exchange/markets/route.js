import { NextResponse } from "next/server";
import { getVolumeMktOverview } from "@app/_services/exchanges";

export async function GET(req) {
  try {
    const results = await getVolumeMktOverview();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing volume market overview.",
      },
      { status: 500 }
    );
  }
}
