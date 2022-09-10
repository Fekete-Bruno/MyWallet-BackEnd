import express from "express";
import cors from "cors";
import { createSession, createUser } from "./controllers/user.controller.js";
import { createLog, findList } from "./controllers/data.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);

app.post("/sign-in",createSession);

app.post('income',createLog);

app.get('/main',findList);

app.listen(5000,()=>{console.log("Listening on port 5000...")});