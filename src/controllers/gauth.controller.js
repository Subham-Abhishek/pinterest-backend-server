const {Router}=require('express')
const jwt=require("jsonwebtoken")
const User = require('../models/user.model')
const { login } = require('./login.controller')
require("dotenv").config()

const newToken=(user)=>{
    // eslint-disable-next-line no-undef
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}
const router=Router()
router.post("",async  (req, res)=>{
    let user;
    try{
        user = await User.findOne({email:req.body.email})
        if(user){
            console.log("user already registered")
            return login(req, res)
        }
            user=await User.create(req.body)
       let token=newToken(user)
       res.status(201).json({user,token})
    }
    catch(e){
        console.log(e,"error")
        res.status(500).json({status:"failed",message:"something went wrong on the server",error:e})
    }
    
})
module.exports =router