const {Router}=require('express')
const authenticate = require('../middlewares/authenticate')
const router=Router()
const Follow=require('../models/follow.model')
router.post("",authenticate,async (req, res)=>{
    console.log(req.body);
    const userFromAuth=req.user.user
    console.log(userFromAuth,"userfromauth")
    try {
        const follow=await Follow.findOne({"$and":[{user_id:userFromAuth._id,followed_user_id:req.body.followed_user_id}]})
        if(follow){
            // eslint-disable-next-line no-unused-vars
            let follow=await Follow.findOneAndDelete({"$and":[{"user_id":userFromAuth._id,"followed_user_id":req.body.followed_user_id}]})
            res.status(201).json({data:{follow:false}})
        }
        else{
            // eslint-disable-next-line no-unused-vars
            let follow=await Follow.create({user_id:userFromAuth._id,followed_user_id:req.body.followed_user_id})
            res.status(201).json({data:{follow:true}})
        }
    } catch (error) {
        console.log(error,"error in follow")
        res.status(500).json({message:"something went wrong", error})
    }
})

async function followedPeople(user_id){
    let data=await Follow.find({followed_user_id:user_id}).populate("user_id").populate("followed_user_id")
    return data
}
async function followedByUser(user_id){
    let data=await Follow.find({user_id:user_id}).populate("user_id").populate("followed_user_id")
    return data
}
router.get("",async (req, res)=>{
    console.log(req.query)
    try{
        if(req.query.followedPeople){
            let data=await followedPeople(req.query.user_id)
            res.status(200).json({data:data})
        }
        else{
            let data=await followedByUser(req.query.user_id)
            res.status(200).json({data:data})
        }
    }
    catch(err){
        console.log(err,"error in get follow")
        res.status(500).json({message:"something went wrong",error:err})
    }
})

module.exports =router



