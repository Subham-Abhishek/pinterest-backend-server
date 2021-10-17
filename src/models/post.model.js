const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    photo_url:{type: String,required:false,default:null},
    goodquality_url: {type:String, required:false,default:null},
    description: {type:String, required:false,default:"Pinterest is an image sharing and social media service designed to enable saving and discovery of information on the internet using images"},
    website: {type:String, required:false,default:"https://www.be-at-one.com/"},
    tags:{type:Array, required:false,default:["latest"]},
    height: {type:Number, required:false,default:4500},
    width: {type:Number, required:false,default:null},
},{
    versionKey:false,
    timestamp:true
})

const Post=mongoose.model("post",postSchema)
module.exports =Post