const {Router}=require('express')
const User= require("../models/user.model")
// const {login}=require("./login.controller")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const router=Router()
const newToken=(user)=>{
    // eslint-disable-next-line no-undef
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}
const register=async (req, res)=>{
    // we will see he is already registered or not if he is already registered we send him to login page
    let user;
    try{
        user = await User.findOne({email:req.body.email})
        if(user){
            // console.log("user already registered")
            return res.status(400).json({status:"failed",message:"User already registered please use another emailid"})
        }
            user=await User.create(req.body)
       let token=newToken(user)
       res.status(201).json({user,token})
    }
    catch(e){
        console.log(e,"error")
        res.status(500).json({status:"failed",message:"something went wrong on the server",error:e})
    }
    
}


router.post('',register)
module.exports =router