const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {type: String, required:true},
    googleId:  {type: String, required:true},
    apikey:  {type: String, required:true}

})

module.exports = mongoose.model('users',UserSchema)