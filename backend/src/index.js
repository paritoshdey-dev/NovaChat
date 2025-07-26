import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import aiBotRoutes from "./routes/aiBot.route.js";

import path from "path";

import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js";


dotenv.config();


const PORT=process.env.PORT;
const __dirname=path.resolve();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

try {
    console.log("Loading auth routes...");
    app.use("/api/auth",authRoutes);
    console.log("✅ Loaded /api/auth");
} catch (error) {
    console.error("❌ Failed to load /api/auth", e);
}
try {
    console.log("Loading message routes...");
    app.use("/api/messages",messageRoutes);
    console.log("✅ Loaded /api/messages");
} catch (error) {
    console.error("❌ Failed to load /api/messages", e);
}
try {
    console.log("Loading AI bot routes...");
    app.use("/api/groq", aiBotRoutes);
    console.log("✅ Loaded /api/groq");
} catch (error) {
    console.error("❌ Failed to load /api/groq", e);
}




if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log("Server is running on PORT:"+PORT);
    connectDB()
})