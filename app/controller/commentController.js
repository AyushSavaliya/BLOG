const Comment = require("../model/commentModel")
const Blog = require("../model/blogModel");
const { ObjectID } = require("mongodb");
const ObjectId = require('mongodb').ObjectID;

const createComment = async (req, res) => {
    var d, curdate;
    const blog_id = ObjectId(req.params.id)
    // const { comment, name, email,comment_date } = req.body;

    try {
        d = req.body.comment_date;
        curdate = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        d = months[curdate.getMonth()] + ' ' + curdate.getDate() + ',' + curdate.getFullYear(); const isIdAvailable = await Blog.findOne({ _id: blog_id });
        if (!isIdAvailable) {
            return res.status(404).send("Bad request");
        }
        // d=req.body.comment_date;
        const userCommit = new Comment({
            comment: req.body.comment,
            name: req.body.name,
            email: req.body.email,
            comment_date: d,
            isvisible: req.body.isvisible,
            blog_id: blog_id
        });
        const commentSave = await userCommit.save();
        res.status(201).send(commentSave);
    } catch (error) {
        res.send(error);
    }
}
const getComment = async (req, res) => {
    try {
        const _id = req.params.id;
        await Blog.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'comments',
                        'localField': '_id',
                        'foreignField': 'blog_id',
                        'as': 'comments'
                    }
                }, {
                    '$match': {
                        '_id': new ObjectId(_id),
                    }
                }
            ]
        ).then((ele) => {
            const arr = ele[0].comments.filter((ele) => ele.isvisible == true)
            delete ele[0].comments
            ele[0].comments = arr
            res.send(ele)
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateComment = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try {
        const updateCommentdata = await Comment.findOneAndUpdate(_id, { isvisible: false }, {
            new: true,
            upsert: true,
            rawResult: true // Return the raw result from the MongoDB driver
        });
        res.status(200).send(updateCommentdata);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteComment = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteCommentdata = await Comment.findByIdAndDelete(_id);
        res.status(200).send(deleteCommentdata);
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = { createComment, getComment,  updateComment, deleteComment }