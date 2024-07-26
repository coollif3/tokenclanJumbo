import { NextResponse } from "next/server";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
  getExchangeTvevFor,
  getExchangeTvevChngFor,
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
    const marketcapData = await getExchangeMktcapFor(slug, parseInt(period));
    const marketcapChng = await getExchangeMktcapChngFor(slug);

    const tvevData = await getExchangeTvevFor(slug, parseInt(period));
    const tvevChng = await getExchangeTvevChngFor(slug);

    return NextResponse.json(
      {
        results: {
          volume: volumeData,
          volumeChng: volumeChngData,
          marketcap: marketcapData,
          marketcapChng,
          tvev: tvevData,
          tvevChng,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing exchange slug data.",
      },
      { status: 500 }
    );
  }
}
