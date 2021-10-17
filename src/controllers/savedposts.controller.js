const {Router}=require('express')
const authenticate = require('../middlewares/authenticate')
const SavedPost = require('../models/savedpost.model')

const router=Router()

router.post("",authenticate,async (req, res)=>{
     try {
        const userFromAuth=req.user.user
        
        let savedPost=await SavedPost.findOne({"$and":[{user_id:userFromAuth._id},{post_id:req.body.post_id}]})
        if(savedPost){
            savedPost=await SavedPost.findOneAndDelete({"$and":[{user_id:userFromAuth._id},{post_id:req.body.post_id}]})
            
            res.status(201).json({data:{save:false}})
        }
        else{
             savedPost =await SavedPost.create({user_id:userFromAuth._id,post_id:req.body.post_id})
             res.status(201).json({data:{save:true}})

        }
     } catch (error) {
         res.status(500).json({message:"something went wrong", error})
     }
})

router.get("",authenticate,async (req, res)=>{
   try {
    const userFromAuth=req.user.user
    let savedPosts=await SavedPost.find({user_id:userFromAuth._id}).populate("user_id").populate({
        path: "post_id",
        populate:{
            path: "user_id"
        }
    })
    savedPosts=savedPosts.map((item)=>{
        return item.post_id
    })
    res.status(200).json({data:savedPosts})
   } catch (error) {
       res.status(500).json({message:"something went wrong", error})
   }
})
router.get("/:id",authenticate,async (req, res)=>{
    try {
     const savedPost=await SavedPost.findById(req.params.id).populate("user_id").populate("post_id")
     res.status(200).json({data:savedPost})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
 })
 
router.delete("/:id",authenticate,async (req, res)=>{
    try {

        // eslint-disable-next-line no-unused-vars
        const userFromAuth = req.user.user
        //check is the authenticated user and savedPost owner is same or not before deleting implement afterwards


        // eslint-disable-next-line no-unused-vars
        const deletePost=await SavedPost.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"succesfully deleted"})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
})
module.exports =router