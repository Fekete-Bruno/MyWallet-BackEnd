import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up",(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password);

    res.sendStatus(201);
});

app.get("/main", (req,res)=>{
    console.log('get');
    res.sendStatus(200);
});

app.listen(5000,()=>{console.log("Listening on port 5000...")});