const jwt= require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    author_name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: false
    },
    author_email:{
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    author_password:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    twitter: {
        type: String
    },
    blog_id : {
        type : mongoose.Types.ObjectId,
        ref : 'blogs'
    },
    tokens: [
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
});

authorSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, "authorGenretToken");
      this.tokens = await this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (error) {
      console.log(error);
    }
};

const Author = mongoose.model("author", authorSchema);
module.exports = Author;