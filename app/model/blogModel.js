
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    image: [{
        type: String
    }],
    categories:[{
        type:String
    }],
    tags:[{
        type:String,
    }],
    date: {
        type: String,
    },
    video:{
        type:String,
        
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    tag_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
    },
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
    }
});
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;