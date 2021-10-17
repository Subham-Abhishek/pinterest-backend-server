// const { default: axios } = require("axios")
let data =require("../../dbPhotos.json")

const Post = require("../models/post.model");

// const postPosts=()=>{
    // for(let i=0;i<data.length;i++){
    //     data[i].email = `${data[i].user.username}@gmail.com`
    //     // console.log(data[i])
    //     data[i].photo_url=data[i].urls.regular
    //     data[i].goodquality_url=data[i].urls.full
    //     data[i].description=data[i].alt_description||data[i].description
    //     data[i].website=data[i].user.portfolio_url
    //     let tags=[]
    //     for(let j=0; j<data[i].tags.length; j++){
    //         for(let key in data[i].tags[j]){
    //             if(key=="type"||key=="title"){
    //                 tags.push(data[i].tags[j][key])
    //             }
    //         }
    //     }
    //     data[i].tags=tags
//         axios.post("http://localhost:8000/updates",data[i])
//     }
// }
// // alt_description 
// // followers
// // google auth 
// // async function postAltDescription(){
// //     try{
// //         let descriptions=[]
// //         for(let i=0;i<data.length;i++){
// //             let description=data[i].alt_description||data[i].description
// //             descriptions.push(description)
// //         }
// //        let {data:datares}= await axios.post("http://localhost:8000/updates",descriptions)
// //         console.log(datares)
// //     }
// //     catch(e){
// //         console.log("error",e)
// //     }
// // }

// postPosts()
// // console.log("hellos")
// module.exports ={postPosts};


async function updatePosts(){
    let posts=await Post.find().lean().exec();
    for(let i=0;i<data.length;i++){
        // console.log(data[i])
        data[i].photo_url=data[i].urls.regular
        data[i].goodquality_url=data[i].urls.full
        data[i].description=data[i].alt_description||data[i].description
        data[i].website=data[i].user.portfolio_url
        let tags=[]
        for(let j=0; j<data[i].tags.length; j++){
            for(let key in data[i].tags[j]){
                if(key==="type"||key==="title"){
                    tags.push(data[i].tags[j][key])
                }
            }
        }
    data[i].tags=tags
  }
  posts.map(async (item,i)=>{
      console.log("done")
  })
}
module.exports={updatePosts}