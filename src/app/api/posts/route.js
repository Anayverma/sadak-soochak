import connectDB from "@/lib/database";
import { NextResponse } from "next/server";

export const POST = async(request)=>{
    try {
        await connectDB();
     return NextResponse.json({message :"I am working properly"})
    } catch (error) {
        console.log(error)
        return new NextResponse.json({error});
    }
}