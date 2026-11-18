import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app=express();
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT||3000);
const ai=process.env.GEMINI_API_KEY?new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}):null;
app.disable("x-powered-by");
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:"48kb"}));
app.use("/api/",rateLimit({windowMs:60_000,limit:25,standardHeaders:"draft-7",legacyHeaders:false}));
app.use(express.static(path.join(__dirname,"public")));
const system=`You are HABU, a friendly and capable personal AI assistant. Reply in the language the user uses: Bengali or English. Be clear, practical, and honest. If a request requires live data or an external action you cannot access, say so. Never claim you completed an action unless you did. Do not ask for passwords, API keys, or sensitive credentials. For study help, explain step by step and support learning.`;
app.get("/api/health",(_req,res)=>res.json({status:"ok",aiConfigured:Boolean(ai),assistant:"HABU"}));
app.post("/api/chat",async(req,res)=>{
 if(!ai)return res.status(503).json({error:"HABU AI is not configured. Add GEMINI_API_KEY to your private .env file, then restart."});
 const messages=req.body?.messages;
 if(!Array.isArray(messages)||messages.length<1||messages.length>16)return res.status(400).json({error:"Send 1–16 messages."});
 if(!messages.every(m=>m&&["user","assistant"].includes(m.role)&&typeof m.content==="string"&&m.content.trim()&&m.content.length<=6000))return res.status(400).json({error:"Invalid message format."});
 try{
   const contents=messages.map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content}]}));
   const response=await ai.models.generateContent({model:process.env.GEMINI_MODEL||"gemini-3.8-flash",contents,config:{systemInstruction:system,maxOutputTokens:1800}});
   res.json({reply:response.text||"I couldn't create a reply. Please try again."});
 }catch(e){console.error("Gemini request error:",e?.message||e);res.status(502).json({error:"AI service error. Check your free-tier quota, API key and model access."})}
});
app.listen(PORT,"0.0.0.0",()=>console.log(`HABU is running at http://localhost:${PORT}`));
