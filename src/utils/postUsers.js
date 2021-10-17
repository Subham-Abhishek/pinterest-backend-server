const { default: axios } = require("axios")
let data =require("../../dbPhotos.json")
const postUsers=async ()=>{
    for(let i=0;i<data.length;i++){
        data[i]=data[i].user
        // console.log(data[i])
        data[i].profile_photo_url=data[i].profile_image.large
        data[i].password="12345"
        data[i].email=`${data[i].username}@gmail.com`
      try {
        await  axios.post("http://localhost:8000/updates",{ke:"jl"})
      } catch (error) {
          console.log(error,"error")
      }
    }
}

postUsers()
module.exports =postUsers;