const {Router}=require('express')
const authenticate = require('../middlewares/authenticate')
const Follow = require('../models/follow.model')
const User = require('../models/user.model')

const router=Router()

async function attachFollowers(_id){
    let followers=await Follow.find({user_id:_id}).populate("followed_user_id").lean().exec()
        //here you will get who the user followed 
    return followers
}
router.post("",async  (req, res) => {
    //never try this route post user only through the registration method
    try{
    const user=await User.create(req.body)
    res.status(201).json({data:user})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
})


router.patch("/:id",authenticate,async (req, res)=>{
    try {
        const userFromAuth=req.user.user
        const user=await User.findByIdAndUpdate(userFromAuth._id,req.body,{new:true}).select('-password').lean().exec()
        user.userFollowedPeople=await attachFollowers(user._id)
        res.status(200).json({data:user})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
})

router.delete("",authenticate,async (req, res)=>{
    try {
        const userFromAuth=req.user.user
        // eslint-disable-next-line no-unused-vars
        const user=await User.findByIdAndDelete(userFromAuth._id)
        res.status(200).json({data:null,message:"succesfully deleted"})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
})


router.get("/:id",async (req, res) => {

    try {
        //excluding password while sending info 
        let user=await User.findById(req.params.id).select('-password').lean().exec()
        user.userFollowedPeople=await attachFollowers(user._id)
        res.status(200).json({data:user})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }

})

router.get("",async (req, res) => {
    try {
        //excluding password while sending info 
        let users=await User.find().select('-password').lean().exec()
        users.map(async (item)=>{
            return await attachFollowers(item._id)
        })
        res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
})




module.exports =router