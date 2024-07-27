import { NextResponse } from "next/server";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainCoinMktcapForSlug,
  getBlockchainCoinMktcapChngForSlug,
  getBlockchainRatioForSlug,
  getBlockchainRatioChngForSlug,
  getBlockchainNameForSlug,
} from "@app/_services/blockchain";

export async function GET(req, { params, query }) {
  try {
    const slug = params.slug;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const period = searchParams.get("period");
    // console.log("period: ", period);

    const coin = await getBlockchainNameForSlug(slug);

    const tvlData = await getBlockchainTvlForSlug(slug, parseInt(period));
    const tvlChngData = await getBlockchainTvlChngForSlug(slug);

    const mktcapData = await getBlockchainCoinMktcapForSlug(
      slug,
      parseInt(period)
    );
    const mktcapChngData = await getBlockchainCoinMktcapChngForSlug(slug);

    const ratioData = await getBlockchainRatioForSlug(slug, parseInt(period));
    const ratioChng = await getBlockchainRatioChngForSlug(slug);

    return NextResponse.json(
      {
        results: {
          coin,
          tvlData: tvlData,
          tvlChng: tvlChngData,
          marketcap: mktcapData,
          marketcapChng: mktcapChngData,
          ratio: ratioData,
          ratioChng,
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
