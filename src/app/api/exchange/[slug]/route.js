import { NextResponse } from "next/server";
import { listExchangeVolumeFor } from "@app/_services/exchanges";

export async function GET(req, { params }) {
  try {
    const slug = params.slug;
    // console.log(slug);
    const results = await listExchangeVolumeFor(slug);
    return NextResponse.json({ results }, { status: 200 });
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
