import { NextResponse } from "next/server";

export async function POST(req) {
    const { name,location,mobileNumber,image  } = await req.json();
    console.log("vghbnjkm",name,location,mobileNumber,image);
    return NextResponse.json({ name,location,mobileNumber,image});
}