import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const post = new Post()
    const { previousImageUrl,  } = await req.json();
    console.log(previousImageUrl);
    return NextResponse.json({ previousImageUrl,resultImageUrl:"https://shorturl.at/bKN47"});
}