const mongoose = require('mongoose');

const followSchema=mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    followed_user_id:{type: mongoose.Schema.Types.ObjectId,ref:"user",required:true},
},{
    versionKey:false,
    timestamp:true
})

const Follow=mongoose.model("follow",followSchema)
module.exports = Follow