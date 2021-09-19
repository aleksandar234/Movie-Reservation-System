const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    first_name: {
        type: String,
        required : true,
    },
    last_name: {
        type: String,
        required : false,
    },
    email: {
        type: String,
        required : false,
    },
    password: {
        type: String,
        required : true,
    }

})



module.exports = mongoose.model('User',UserModel)