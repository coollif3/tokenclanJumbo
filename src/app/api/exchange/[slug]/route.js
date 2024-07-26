import { NextResponse } from "next/server";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
} from "@app/_services/exchanges";

export async function GET(req, { params, query }) {
  try {
    const slug = params.slug;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const period = searchParams.get("period");
    // console.log("period: ", period);
    const volumeData = await getExchangeVolumeFor(slug, parseInt(period));
    const volumeChngData = await getExchangeVolumeChngFor(slug);
    const marketcap = await getExchangeMktcapFor(slug, parseInt(period));
    const marketcapChng = await getExchangeMktcapChngFor(slug);

    return NextResponse.json(
      {
        results: {
          volume: volumeData,
          volumeChng: volumeChngData,
          marketcap,
          marketcapChng,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing exchange volume for slug data.",
      },
      { status: 500 }
    );
  }
}
