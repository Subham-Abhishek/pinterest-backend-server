const authorise=(allowedPeople)=>{
    return (req,res,next)=>{
        const user=req.user.user
        const roles=user.roles||[]
        const filteredRoles=allowedPeople.filter((item)=>{
            return roles.includes(item)
        })
        if(filteredRoles.length>0){
            next()
        }
        else{
            res.status(400).json({status:"failed",message:"you are not authorised to access this page"})
        }

    }
}
module.exports =authorise