import { NextResponse } from "next/server";
import {
  getVolumeMktOverview,
  getVolumeMktOverviewChng,
} from "@app/_services/exchange";

export async function GET(req) {
  try {
    const mktData = await getVolumeMktOverview();
    const chngData = await getVolumeMktOverviewChng();

    return NextResponse.json({ mktData, chngData }, { status: 200 });
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
