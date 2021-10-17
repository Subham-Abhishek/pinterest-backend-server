const {Router}=require('express');
const User = require('../models/user.model');
const jwt=require("jsonwebtoken")
require("dotenv").config()
const newToken=(user)=>{
    // eslint-disable-next-line no-undef
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}
const router=Router()
const login=async (req, res) => {
    //first we will check if the user is there in the dbase if not we will send error
    let user;
    try{
        user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({status:"failed",message:"email or password is wrong"})
       const match= user.checkPassword(req.body.password)
           if(match){
            const token=newToken(user)
            res.status(201).json({user,token})
           }
           else{
            res.status(500).json({status:"failed",message:"email or password is wrong"})
           }
        
    }
    catch(err){
        console.log(err,"error")
        res.status(500).json({status:"failed",message:"email or password is wrong"})
    }
}
router.post("",login)
const loginController=router
module.exports ={loginController,login}