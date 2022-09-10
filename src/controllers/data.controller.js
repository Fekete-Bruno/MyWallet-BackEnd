import db from "../database/db.js";


async function findList(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ','');

    if (!token) return res.sendStatus(401);


    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);
        const user = await db.collection('users').findOne({_id:session.userId});
        if(!user) return res.sendStatus(404);
        delete user.password;
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function createLog (req,res){
    console.log(req.body);
    
    return res.sendStatus(200);
}

export {findList , createLog}