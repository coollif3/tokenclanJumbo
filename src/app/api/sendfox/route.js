// pages/api/subscribe.js
import { NextResponse } from "next/server";
import { addSubscriber } from "@app/_lib/sendfox";

export async function POST(req) {
  const { email, firstName } = await req.json();

  try {
    const response = await addSubscriber(email, firstName);
    // console.log("Response: ", response);
    if (!response.id) {
      return NextResponse.json({ message: response.email }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Subscription successful", data: response },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
