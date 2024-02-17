import { NextResponse } from "next/server";

export async function POST(req) {
    const { previousImageUrl  } = await req.json();
    console.log(previousImageUrl);
    return NextResponse.json({ previousImageUrl,resultImageUrl:"https://shorturl.at/bKN47"});
}