import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true,
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
