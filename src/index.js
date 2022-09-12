import express from "express";
import cors from "cors";
import { createSession, createUser, deleteUnactiveSessions } from "./controllers/user.controller.js";
import { createLog, findLogs } from "./controllers/logs.controller.js";

const interval = 10000;

const app = express();
app.use(cors());
app.use(express.json());

setInterval(deleteUnactiveSessions,interval);

app.post("/sign-up", createUser);

app.post("/log-in",createSession);

app.post('/logs',createLog);

app.get('/main',findLogs);

app.listen(5000,()=>{console.log("Listening on port 5000...")});