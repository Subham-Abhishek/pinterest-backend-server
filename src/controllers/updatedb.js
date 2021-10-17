const {Router}=require('express')
const Post = require('../models/post.model')
const User = require('../models/user.model')
const router=Router()
var posts=[]
async function getPosts(){
    let posts=await Post.find().lean().exec()

}
getPosts()

router.post("",async (req, res)=>{
    try {
        console.log(posts,"posts")
       

       res.status(200).json({
           got:"it"
       })
    } catch (error) {
        res.status(500).json( {message:"something went wrong"})
    }
})
module.exports=router