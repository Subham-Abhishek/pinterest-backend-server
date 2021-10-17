const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyToken=token=>{
    return new Promise((resolve,reject)=>{
        // eslint-disable-next-line no-undef
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) reject(err)
            if(user) resolve(user)
        })
    })
}
const authenticate=async(req, res,next)=>{
    let bearerToken=req?.headers?.authorization
    //we will see if there is a bearer token in the headers or if it is we will check if its sent correctly startsWith ("bearer") or not
    // console.log(bearerToken,"btoken")
    if(!bearerToken || !bearerToken.startsWith("Bearer")) return res.status(400).json({message:"Invalid bearer token"})
    //if there we will split and take the token and verify it
    bearerToken=bearerToken.split(" ")[1]
    let user;
    try{
        user=await verifyToken(bearerToken)
    }
    catch(err){
        console.log(err,"err")
        return res.status(400).json({message:"wrong token"})
    }
    req.user=user
    next()
}

module.exports=authenticate