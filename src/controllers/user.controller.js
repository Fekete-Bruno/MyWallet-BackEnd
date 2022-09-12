import bcrypt from "bcrypt";
import db from "../database/db.js";
import {v4 as uuid} from "uuid";

const usersCollection = db.collection('users');

async function createUser (req,res){
    const {name,email,password} = req.body;
    const hash = bcrypt.hashSync(password,12);

    try {

        const doesUserExist = await usersCollection.findOne({email});
        if(doesUserExist){
            return res.sendStatus(409);
        }
        await usersCollection.insertOne({name,email,password: hash});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    
    return res.sendStatus(201);
}

async function createSession(req,res){
    const {email,password} = req.body;
    const errorMessage = "Invalid e-mail or password";

    try {
        const user = await usersCollection.findOne({email});

        if (user && bcrypt.compareSync(password,user?.password)){

            const token = uuid();
            const timestamp = Date.now();
            db.collection('sessions').insertOne({
                token,
                timestamp,
                userId: user._id
            });
            return res.send(token);
        } else {
            return res.status(401).send(errorMessage);
        };

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function deleteUnactiveSessions(){
    const oneHour = 1000*3600;
    try {
        const date = Date.now();
        await db.collection('sessions').deleteMany({"timestamp":{$lt:date-oneHour}});
    } catch (error) {
        console.error(error);
    }
}

export { createUser , createSession, deleteUnactiveSessions };