import { NextResponse } from "next/server";
import connect from "../../../../db";

export const POST = async(request)=>{
    try {
     await connect();   
     return new NextResponse()
    } catch (error) {
        console.log(error)

        return new NextResponse.json({error});
    }
}