const mongoose = require('mongoose');

const savedPostSchema=mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    post_id:{type: mongoose.Schema.Types.ObjectId,ref:"post",required:true},
},{
    versionKey:false,
    timestamp:true
})

const SavedPost=mongoose.model("savedPost",savedPostSchema)
module.exports = SavedPost