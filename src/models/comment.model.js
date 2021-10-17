const mongoose = require('mongoose');

const commentSchema=mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    post_id:{type: mongoose.Schema.Types.ObjectId,ref:"post",required:false,default:null},
    parentCommentId:{type: mongoose.Schema.Types.ObjectId,ref:"comment",required:false,default:null},
    body:{type: String,required:true},
    parentType:{type: String,required:true,enum:["comment","post"]}
},{
    versionKey:false,
    timestamp:true
})

const Comment=mongoose.model("comment",commentSchema)
module.exports = Comment