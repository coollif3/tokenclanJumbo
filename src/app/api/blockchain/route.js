import { NextResponse } from "next/server";
import { listBlockchains } from "../../_services/blockchain";

export async function GET(req) {
  try {
    const results = await listBlockchains();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Server error in listing blockchains.",
      },
      { status: 500 }
    );
  }
}
