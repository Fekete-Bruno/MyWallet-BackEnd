import db from "../database/db.js";
import dayjs from 'dayjs';


async function findLogs(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ','');

    if (!token) return res.sendStatus(401);


    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

        const user = await db.collection('users').findOne({_id:session.userId});
        if(!user) return res.sendStatus(404);

        const logs = await db.collection('logs').find({userId:session.userId}).toArray();
        delete user.password;
        user.logs=logs;
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function createLog (req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ','');
    const { value, description } = req.body;

    if(!token) return res.sendStatus(401);

    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

        const user = await db.collection('users').findOne({_id:session.userId});
        if(!user) return res.sendStatus(404);

        const date = dayjs(Date.now()).format('MM/DD');

        await db.collection('logs').insertOne({
            date,
            description,
            value,
            userId:session.userId,
        });

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
    
    return res.sendStatus(200);
}

export {findLogs , createLog}