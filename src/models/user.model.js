const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    username:{type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    profile_photo_url: {type:String, required:true},
    bio: {type:String, required:false, default:"Talk is cheap, show me the code"},
},{
    versionKey:false,
    timestamp:true
})

userSchema.pre("save", function (next){
    const hash=bcrypt.hashSync(this.password,8)
    this.password=hash
    next()
})

userSchema.methods.checkPassword = function (password){
    const passwordHash=this.password
    return bcrypt.compareSync(password,passwordHash)
}


const User=mongoose.model('user',userSchema)

module.exports =User
