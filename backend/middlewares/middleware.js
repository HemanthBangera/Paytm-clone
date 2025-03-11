const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config")

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({"jkk":"darshen"});
    }

    const splitarray = authHeader.split(" ");
    const token = splitarray[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        next();
    }
    catch(err){
        return res.status(403).json({'j':authHeader});
    }
}

module.exports = {
    authMiddleware
}