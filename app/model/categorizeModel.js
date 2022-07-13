const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
    }
});


const Category = mongoose.model("category", categorySchema);
module.exports = Category; 