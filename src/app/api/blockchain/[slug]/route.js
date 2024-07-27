import { NextResponse } from "next/server";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainCoinMktcapForSlug,
  getBlockchainCoinMktcapChngForSlug,
} from "@app/_services/blockchain";

export async function GET(req, { params, query }) {
  try {
    const slug = params.slug;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const period = searchParams.get("period");
    // console.log("period: ", period);

    const tvlData = await getBlockchainTvlForSlug(slug, parseInt(period));
    const tvlChngData = await getBlockchainTvlChngForSlug(slug);

    const mktcapData = await getBlockchainCoinMktcapForSlug(
      slug,
      parseInt(period)
    );
    const mktcapChngData = await getBlockchainCoinMktcapChngForSlug(slug);

    return NextResponse.json(
      {
        results: {
          tvlData: tvlData,
          tvlChng: tvlChngData,
          marketcap: mktcapData,
          marketcapChng: mktcapChngData,
          //   tvev: tvevData,
          //   tvevChng,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in retrieving blockchain slug data.",
      },
      { status: 500 }
    );
  }
}
