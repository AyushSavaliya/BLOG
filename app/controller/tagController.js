
const Tags = require("../model/tagModel");
const Blog = require("../model/blogModel");
const async = require("hbs/lib/async");
const ObjectId = require('mongodb').ObjectID;

const createTag = async (req, res) => {

  try {
    const CreatTag = new Tags({
      tag: req.body.tag,
      // blog_id: req.params.id
    });
    const tagdata = await CreatTag.save();
    res.status(201).send(tagdata);
  } catch (error) {
    res.status(400).send(error);
  }
}
const getTag = async (req, res) => {
  try {
    const _id = req.params.id;
    const blogs = await Blog.aggregate([
      {
        '$lookup': {
          'from': 'tags',
          'localField': '_id',
          'foreignField': 'blog_id',
          'as': 'Tag'
        }
      }, {
        '$match': {
          '_id': ObjectId(_id)
        }
      }
    ]);
    res.status(200).send(...blogs);
  } catch (error) {
    res.status(400).send(error);
  }
}

const getAllfindTag = async(req,res) => {
    try {
        const tagResponse = await Tags.find();
        res.status(200).send(tagResponse);
    } catch (error) {
      res.status(400).send(error);
    }
}

const updateTag = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await Tags.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).send(updateData);
  } catch (error) {
    res.status(400).send(error);
  }
}
const deleteTag = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const deleteData = await Tags.findByIdAndDelete(_id);
    res.status(200).send(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
}
module.exports = { createTag, getTag,getAllfindTag, updateTag, deleteTag }