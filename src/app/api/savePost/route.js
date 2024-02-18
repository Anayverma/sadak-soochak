import { NextResponse } from "next/server";
import Post from "../../../../models/Post";
import connectDB from "@/lib/database";

export async function POST(req) {
    try {
        await connectDB();
        const { name, location ,image } = await req.json();

        console.log(name);
        console.log(location);
        console.log(image);

        const post = new Post({
            name,
            location,
            image,
        });

        const response = await post.save();
        console.log("Post saved successfully:", response);
        return NextResponse.json({ post });
    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json({ error: "An error occurred while saving the post." });
    }
}