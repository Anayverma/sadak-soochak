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

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;