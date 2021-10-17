const {Router}=require('express')
const Comment = require('../models/comment.model')
// const Activity = require('../models/activity.model')
const Like = require('../models/like.model')
const Post = require('../models/post.model')
const authenticate= require("../middlewares/authenticate")
const Follow = require('../models/follow.model')
// const authorise= require("../middlewares/authorise")
const router=Router()

async function attachFollowers(_id){
    let followers=await Follow.find({followed_user_id:_id}).populate("user_id").lean().exec()
    return followers
    //here you will get the follwers of a user
}

router.post("",authenticate,async (req, res) => {
    try{
        req.body.user_id=req.user.user._id
        const post=await Post.create(req.body)
        res.status(201).json({data:post})
    }
    catch(err){
        res.status(500).json({status:"failed",message:"something went wrong with posting post"})
    }
})
async function attachLikesComments(givenPost){
    if(!givenPost){
        return null
    }
    let likes=await Like.find({post_id: givenPost._id}).populate("user_id").lean().exec()
            givenPost.likes=likes
            let comments=await Comment.find({post_id: givenPost._id}).populate("user_id").lean().exec()
            for(let j=0; j<comments.length; j++){
                let reply=await Comment.find({parentCommentId:comments[j]._id}).populate("user_id").lean().exec()
                comments[j].reply=reply
            }
            givenPost.comments=comments
            // console.log(givenPost,"givenpOst")
            return givenPost
}
router.get("",async (req, res) => {
    try{
         // page number and limit
        // 2 10  
        let {pageNumber, limit} = req.query
        pageNumber=pageNumber ||"1"
        limit=limit ||"25"
        pageNumber=Number(pageNumber)
        limit=Number(limit)
        const skipElements=(pageNumber-1)*limit
        const posts=await Post.find().populate("user_id").skip(skipElements).limit(limit).lean().exec()
        //attaching likes and commnts to the post
        for(let i=0; i<posts.length; i++){
            // console.log(posts[i])
            posts[i]=await attachLikesComments(posts[i])
            posts[i].user_id.followers=await attachFollowers(posts[i].user_id._id)
        }
        res.status(200).json({data:posts})
    }
    catch(err){
        res.status(500).json({status:"failed",message:"something went wrong with getting post"})
    }
})

router.get("/:id",async (req, res) => {
    try{
        let post=await Post.findById(req.params.id).populate("user_id").lean().exec()
        //attaching likes and comments to the post
        post=await attachLikesComments(post)
        post.user_id.followers=await attachFollowers(post.user_id._id)
        res.status(200).json({data:post})
    }
    catch(err){
        console.log(err,"error")
        res.status(500).json({status:"failed",message:"something went wrong with getting single post"})
    }
})

router.patch("/:id",authenticate,async (req, res) => {
    try{
        //check is the user same in the post and the request user implement it afterwards 
        let post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        //attaching likes and comments to the post
        post=await attachLikesComments(post)
        res.status(200).json({data:post})
    }
    catch(err){
        res.status(500).json({status:"failed",message:"something went wrong with patching post"})
    }
})

router.delete("/:id",authenticate,async (req, res) => {
    try{
        //check is the user same in the post and the request user implement it afterwards
        
        // eslint-disable-next-line no-unused-vars
        let post=await Post.findByIdAndDelete(req.params.id)
        //attaching likes and comments to the post
        let posts=await Post.find().lean().exec()
        res.status(200).json({data:posts})
    }
    catch(err){
        res.status(500).json({status:"failed",message:"something went wrong with deleting post"})
    }
})

router.get("/tags/:tag",async (req, res)=>{
    //search will be done with the tags
    //changed => single element array  
    let reqTags=[req.params.tag];
    let tags=[]
    for(let i=0; i<reqTags.length; i++){
        tags.push({"tags":reqTags[i]})
    }
    let posts=await Post.find({"$or":tags}).populate("user_id").lean().exec()
    posts=posts.reverse()
    res.status(200).json({data:posts})
})




module.exports =router