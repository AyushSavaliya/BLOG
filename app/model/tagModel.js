const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
    }
});

const Tags = mongoose.model("tag", tagSchema);
module.exports = Tags;