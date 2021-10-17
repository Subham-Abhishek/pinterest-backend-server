const mongoose = require('mongoose');

const activitySchema=mongoose.Schema({
    post_id:{type: mongoose.Schema.Types.ObjectId,ref:"post",required:false,default:null},
    parentCommentId:{type: mongoose.Schema.Types.ObjectId,ref:"comment",required:false,default:null},
    body:{type: String,required:true},
    parentType:{type: String,required:true,enum:["comment","post"]}
},{
    versionKey:false,
    timestamp:true
})

const Activity=mongoose.model("activity",activitySchema)
module.exports = Activity