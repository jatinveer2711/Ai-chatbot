// import { response } from "express"
import jwt from "jsonwebtoken"
import config from "../config.js"

function userMiddleware(req,res,next){
    const authHeader=req.headers.authorization // authHeader ek variable h jisme ek token pda hua h uss token ki help se authicanted user apnni website visit kr skta h 

    if(!authHeader || !authHeader.startsWith("Bearer ")){ // if autheader nhi h yaa bearer se start nhi ho rha  h to error show krdo means user ko prompt nhi krne denge
        return res.status(401).json({errors:"no tokem is provided"})
    }
    const token=authHeader.split(" ")[1] // isse hme token mil rha h or ye  split("") authheader ke authorization me jakr beare ko skip krra  h 
        //    console.log(token)
// console.log(config.JWT_USER_PASSWORD)
    try{
       const decoded= jwt.verify(token,config.JWT_USER_PASSWORD) // verify krenge ki token or password ko 
       console.log(decoded)
       req.userID=decoded.id


       next() // next function call 

    } catch(error){
        return res.status(401).json({errors:"invalid token or expired"})

    }
  
}

export default userMiddleware;