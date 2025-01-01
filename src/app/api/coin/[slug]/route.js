import { NextResponse } from "next/server";
import {
  getCoinNameFor,
  getCoinPriceForSlug,
  getCoinPriceChngForSlug,
} from "@app/_services/coin";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const period = searchParams.get("period");
    // console.log("period: ", period);

    const coin = await getCoinNameFor(slug);

    const coinPrice = await getCoinPriceForSlug(slug, period);
    const coinPriceChng = await getCoinPriceChngForSlug(slug);

    return NextResponse.json(
      {
        results: {
          coin,
          coinPrice: coinPrice,
          coinPriceChng: coinPriceChng,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in retrieving coin slug data.",
      },
      { status: 500 }
    );
  }
}
