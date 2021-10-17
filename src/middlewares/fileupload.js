const multer=require("multer");
const path=require("path");
const storage=multer.diskStorage({
    destination: function (req,file,callback){
        // eslint-disable-next-line no-undef
        callback(null,path.join(__dirname,"../../uploads"))
    },
    filename: function (req,file,callback){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9)+file.originalname
        callback(null,uniqueSuffix)
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}

module.exports=multer({
    storage,
    fileFilter,
    limits:1024*1024*5
})
