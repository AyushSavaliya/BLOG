const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
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

userSchema.methods.generateAuthToken = async function () {
    try {
      const token = await jwt.sign({ _id: this._id }, "userGenretToken");
      this.tokens = await this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (error) {
      console.log(error.message);
    }
};

const User = mongoose.model("user", userSchema);
module.exports = User;