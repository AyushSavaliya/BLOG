const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    message:{
            type:String,
            require:true
    }
});

const Contact = mongoose.model("contact",contactSchema);

module.exports = Contact;