const {Router}=require('express')
const authenticate = require('../middlewares/authenticate')
const Comment = require('../models/comment.model')

const router=Router()

router.post('',authenticate,async (req, res)=>{
       //extracting user from the authenticate function
       const userFromAuth=req.user.user
       req.body.user_id=userFromAuth._id
       try {
           //if else is wheather the user  commented to a post or a comment
        let comment= await Comment.create(req.body)
        // if(req.body.parentCommentId){
        //     let pComment=await Comment.findByIdAndUpdate(req.body.parentCommentId,{})   
        // }
        return res.status(201).json({data:comment})
       } catch (error) {
           console.log(error,"comment post error")
           res.status(500).json({message:"something went wrong on commenting post", error})
       }
})
router.get('',async (req, res)=>{
    //we will use query params to check if they need comments for a comment or a post
    //implement recursive comments  do it at last if time permits 
    try {
        if(req?.query?.post_id){
            let comments=await Comment.find({post_id:req.query.post_id}).populate("user_id")
            res.status(200).json({data:comments})
        }
        else{
            let comments=await Comment.find({parentCommentId:req.query.parentCommentId}).populate("user_id")
            res.status(200).json({data:comments})
        }
    } catch (error) {
        console.log(error,"comment get error")
        res.status(500).json({message:"something went wrong on getting comments of post or comment", error})
    }
})
//if they want recursive comments in front end they can implement that or if they only want one layer of comments and replies that to can be done

router.patch("/:id",authenticate,async (req, res)=>{
        //check is the user same in the post and the request user implement it afterwards
      try {
          let comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true});
          res.status(201).json({data:comment})
      } catch (error) {
        res.status(500).json({message:"something went wrong", error})
      }
})

router.delete("/:id",authenticate,async (req, res)=>{
         //check is the user same in the post and the request user implement it afterwards
         try {
            // eslint-disable-next-line no-unused-vars
            let comment=await Comment.findByIdAndDelete(req.params.id);
            let comments=await Comment.find().lean().exec()
            res.status(201).json({data:comments,status:"succesfully deleted"})
        } catch (error) {
          res.status(500).json({message:"something went wrong", error})
        }
})

module.exports =router

