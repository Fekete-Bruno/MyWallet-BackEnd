import express from "express";
import cors from "cors";
import { createSession, createUser } from "./controllers/user.controller.js";
import { createLog, findLogs } from "./controllers/logs.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);

app.post("/log-in",createSession);

app.post('/income',createLog);

app.post('/expense',createLog);

app.get('/main',findLogs);

app.listen(5000,()=>{console.log("Listening on port 5000...")});