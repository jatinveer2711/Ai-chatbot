import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import promptRoutes from './routes/prompt.route.js'
import historyRoutes from './routes/History.route.js'

// import historyRoutes from "./routes/History.route.js";

import cookieParser from 'cookie-parser';
import cors from "cors"
dotenv.config()
const apps=express();
const port=process.env.PORT ;

const MONGO_URL=process.env.MONGO_URI

//middleware (we use miidleware for receive the data wicch is coming from body)

apps.use(express.json())
apps.use(cookieParser());
apps.use(
  cors({
    origin:process.env.FROTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["content-Type","Authorization"]
  })
)



// DB connection code goes here !!!

mongoose.connect(MONGO_URL)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("MOngodb connection error", error))

//Routes
// apps.use('/api/v1/history', historyRoutes);

apps.use('/api/v1/user',userRoutes)
apps.use('/api/v1/deepseekai',promptRoutes)
apps.use("/api/v1/history", historyRoutes);
// apps.use("/api/v1/deepseekai", sessionRoute);

apps.listen(port,()=>{
    console.log(`server is running on port on port ${port}`)
})
