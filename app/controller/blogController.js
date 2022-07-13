const Blog = require("../model/blogModel");
const Author = require("../model/authorModel");
const ObjectId = require('mongodb').ObjectID;
const { default: mongoose } = require("mongoose");
const { title } = require("process");

const createBlog = async (req, res) => {
    var d;
    var curDate;
    var url = [];
    try {
        if (req.files) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }

            for (const key in req.files) {
                            // base64 string
            var base64Str = base64_encode(req.files[key].path)

            // image url
             url.push(`data:${req.files[key].mimetype};base64,${base64Str}`)
            }
        }
        d = req.body.date;
        if (!req.body.date) {
            curDate = new Date();
            d = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
        }
        const userblog = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: url,
            video:req.body.video,
            categories:  [req.body.categories] ,
            tags:  [req.body.tags] ,
            date: d,
            author_id: req.params.id,
            category_id: req.body.category_id,
            tag_id: req.body.tag_id,
            comment_id: req.body.comment_id
        });
        const blogSave = await userblog.save();
        res.status(201).send({ blogSave });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFindData = async (req, res) => {
    try {
        const response = await Blog.find();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error);
    }
}

const addCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        // const pushCategory = ( categories  = [req.body.categories]);
        const addedCategory = await Blog.findByIdAndUpdate(_id, { $push: { categories: [req.body.categories] } }, { new: true });
        res.status(201).send(addedCategory);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTag = async (req, res) => {
    try {
        const _id = req.params.id;
        // const pushTag = ({ tag } = req.body);
        const addedtag = await Blog.findByIdAndUpdate(_id, { $push: { tags: [req.body.tags] } }, { new: true });
        res.status(201).send(addedtag);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getAutherfindId = async (req, res) => {
    try {
        const _id = req.params.id;
        const author = await Author.aggregate([
            {
                '$lookup': {
                    'from': 'authors',
                    'localField': '_id',
                    'foreignField': 'author_id',
                    'as': 'authordetails'
                }
            }, {
                '$match': {
                    '_id': ObjectId(_id)
                }
            }
        ]);
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getBlogid = async (req, res) => {
    try {
        let id = ObjectId(req.params.id);
        const blogData = await Blog.aggregate([
            {
                '$lookup': {
                    'from': 'authors',
                    'localField': 'author_id',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$match': {
                    '_id': id
                }
            }
        ])

        res.status(200).send(...blogData);
    } catch (error) {
        res.status(400).json(error.message);
    }
}


const updateBlog = async (req, res) => {
    try {
        var d;
        var curDate;
        if (req.file) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }
            // base64 string
            var base64Str = base64_encode(req.file.path)

            // image url
            var url = `data:${req.file.mimetype};base64,${base64Str}`
        }
        d = req.body.date;
        if (!req.body.date) {
            curDate = new Date();
            d = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
        }

        const _id = req.params.id;
        const updateData = await Blog.findByIdAndUpdate(_id, {
            title: req.body.title,
            description: req.body.description,
            image: url,
            categories:  [req.body.categories] ,
            tags:  [req.body.tags] ,
            date: d,
            author_id: req.params.id,
            category_id: req.body.category_id,
            tag_id: req.body.tag_id,
            comment_id: req.body.comment_id
        }, { new: true });
        res.status(200).send(updateData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await Blog.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getBlogByAuthor = async (req, res) => {
    const author_id = req.params.author_id;

    try {
        const blogs = await Blog.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'authors',
                        'localField': 'author_id',
                        'foreignField': '_id',
                        'as': 'author'
                    }
                }, {
                    '$match': {
                        'author_id': ObjectId(author_id)
                    }
                }
            ]
        );

        const blog = await Blog.findOne({ author_id: author_id }).populate('authors')
        res.status(200).send(blog);
    } catch (error) {
        res.status(404).send(error)
    }
}

const getAllBlogs = async (req, res) => {
    const curDate = new Date();
    const today = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
    try {
        const blogs = await Blog.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'comments',
                        'localField': 'comment_id',
                        'foreignField': '_id',
                        'as': 'comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'category_id',
                        'foreignField': '_id',
                        'as': 'categories'
                    }
                }, {
                    '$lookup': {
                        'from': 'authors',
                        'localField': 'author_id',
                        'foreignField': '_id',
                        'as': 'author'
                    }
                }, {
                    '$lookup': {
                        'from': 'tags',
                        'localField': 'tag_id',
                        'foreignField': '_id',
                        'as': 'tag'
                    }
                }, {
                    '$match': {
                        'date': {
                            '$lte': today
                        }
                    }
                }
            ]
        )
        res.status(200).send(blogs);

    } catch (error) {
        res.status(404).send(error)
    }
}


const searchQuery = async (req, res) => {
    try {
        const {title,description,category,tag,date} = req.query;
        
        const searchData = await Blog.find({
            $or:[
                {title:title},
                {description:description},
                {category:category},
                {tag:tag},
                {date:date}
        ]
        });
       
        res.status(200).send(searchData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { createBlog, getAllFindData, addCategory, addTag, getAutherfindId, getBlogid, updateBlog, deleteBlog, getBlogByAuthor, getAllBlogs ,searchQuery}