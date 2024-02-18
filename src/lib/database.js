// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// const connect = async()=>{
//     try {
//         const response = await mongoose.connect(process.env.MONGODB_URL);
//         console.log("connection set passed\n\n\n\n\n\n")
//         console.log(response)
//         NextResponse.json({test:"connect"});
//     } catch (error) {
//         console.log(error)
//             throw new Error("Error in connecting")
//     }
// }

// export default connect;


import mongoose from 'mongoose';

export const connectDB = async (req, res) => {
  // Use new db connection
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL).then(()=>{
    console.log("I am connected")
  }).catch((err)=>{console.log(err)});
};

export default connectDB;
