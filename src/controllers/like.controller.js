const {Router}=require('express')
const authenticate = require('../middlewares/authenticate')
const Like = require('../models/like.model')
const router=Router()

router.post("",authenticate,async (req, res)=>{
    // I will check the wheather this user liked the post already if so I will remove the like and send the updated likes back

    //extracting user from the authenticate function
    const userFromAuth=req.user.user
    req.body.user_id=userFromAuth._id
    try {
        //if else is wheather they send a like to a post or a comment
        if(req?.body?.post_id){

            let like=await Like.findOne({"$and":[{post_id:req.body.post_id},{user_id:req.body.user_id}]})
            // console.log(like,"like");
            if(like){
               // eslint-disable-next-line no-unused-vars
               let likedeleted= await Like.findByIdAndDelete(like._id,{new:true})
                return res.status(201).json({data:{like:false}})
            }
            else{
                like= await Like.create(req.body)
              return res.status(201).json({data:{like:true}})
            }
        }
        else{
            console.log("req came in coment")
            //
            let like=await Like.find({"$and":[{parentCommentId:req.body.parentCommentId},{user_id:req.body.user_id}]})
            if(like){
                await Like.findByIdAndDelete(like._id)
                return res.status(201).status({data:{like:false}})
            }
            else{
               like= await Like.create(req.body)
               return res.status(201).json({data:{like:true}})
            } 
        }
    } catch (error) {
        console.log(error,"like post error")
        res.status(500).json({message:"something went wrong on liking post", error})
    }
})

router.get("",async (req, res)=>{
    //we will use query params to check if they need likes for a comment or a post 
    try {
        if(req?.query?.post_id){
            let likes=await Like.find({post_id:req.query.post_id}).populate("user_id")
            res.status(200).json({data:likes})
        }
        else{
            let likes=await Like.find({parentCommentId:req.query.parentCommentId}).populate("user_id")
            res.status(200).json({data:likes})
        }
    } catch (error) {
        console.log(error,"like get error")
        res.status(500).json({message:"something went wrong on getting liking of post or comment", error})
    }
})

module.exports =router
