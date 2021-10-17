const mongoose = require('mongoose');
const {MONGOURI}=require('../keys')
const connect=()=>{
    return mongoose.connect(MONGOURI)
}
module.exports = connect
