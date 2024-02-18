import { NextResponse } from "next/server";
import Post from "../../../../models/Post";

export async function POST(req) {
    try {
        const { name, location,image } = req.json(); 

        const post = new Post({
            name,
            location,
        });

        const response = await post.save();
        console.log("Post saved successfully:", response);
        return new NextResponse.json({ post }); 
    } catch (error) {
        console.error("Error saving post:", error);
        return new NextResponse.json({ error: "An error occurred while saving the post." }); // Return an error response
    }
}
