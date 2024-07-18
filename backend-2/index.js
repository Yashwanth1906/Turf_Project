import express from "express"
import cors from "cors"

import turfRouter from "./routes/turfRoute.js";
import userRouter from "./routes/userRoute.js";

import adminRouter from "./routes/adminRoute.js";

import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

/*App Config*/
const app = express();
const PORT = 4000;
/* Middleware */
app.use(express.json())

app.use(cors())
/* DB connection */



/* API endpoints */
app.use("/api/admin",adminRouter)
app.use("/api/turfdetails",turfRouter)
app.use("/api/user",userRouter)

app.get("/test",async(req,res)=>{
    const data=await prisma.turfSlot.create({
        data:{
            date:"2024-07-21",
            slot:"15:00-16:00",
            turfId:1,
            price:100
        }
        
    })
    return res.json(data)
})


app.listen(PORT,()=>{
    console.log("Running.........")
});

app.get("/",(req,res)=>{
    res.send("Hello world from express");
})
