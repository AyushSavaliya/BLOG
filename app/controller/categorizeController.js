const Category = require("../model/categorizeModel");
const Blog = require("../model/blogModel");
const async = require("hbs/lib/async");
const ObjectId = require('mongodb').ObjectID;
const createCategory = async (req, res) => {
  try {
    const creatCategory = new Category({
      category: req.body.category,
      // blog_id: req.params.id
    }
    );
    const categoryData = await creatCategory.save();
    res.status(201).send(categoryData);
  } catch (error) {
    res.status(400).send(error);
  }
}
const getCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const blogs = await Blog.aggregate([
      {
        '$lookup': {
          'from': 'categories',
          'localField': '_id',
          'foreignField': 'blog_id',
          'as': 'Categories'
        }
      }, {
        '$match': {
          '_id': ObjectId(_id)
        }
      }
    ]);
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
}
const getAllfindCategory = async (req,res) => {
    try {
      const response = await Category.find();
    res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await Category.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).send(updateData);
  } catch (error) {
    res.status(400).send(error);
  }
}
const deleteCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await Category.findByIdAndDelete(_id);
    res.status(200).send(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
}
module.exports = { createCategory, getCategory,getAllfindCategory, updateCategory, deleteCategory };