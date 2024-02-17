import { NextResponse } from "next/server";
import Post from "../../../../models/Post";

export async function POST(req) {
    try {
        const { name, location } = req.body; // Destructure name and location from the request body

        const post = new Post({
            name,
            location,
        });

        const response = await post.save();
        console.log("Post saved successfully:", response);
        return new NextResponse.json({ post }); // Return the saved post in the response
    } catch (error) {
        console.error("Error saving post:", error);
        return new NextResponse.json({ error: "An error occurred while saving the post." }); // Return an error response
    }
}
