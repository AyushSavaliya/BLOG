const mongoose = require("mongoose");
const validator = require("validator");

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    comment_date:{
        type:String
    },
    isvisible:{
        type:Boolean,
        default:true
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
    }
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
