const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    profile_image:{
        type:String,
        required:true
    },
    admin_name: {
        type: String,
        required: true
    },
    admin_username: {
        type: String,
        required: true,
        unique: true
    },
    admin_email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    admin_password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});


const adminUser = mongoose.model("adminuser",adminSchema);
module.exports = adminUser;