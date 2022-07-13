const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { createCategory, getCategory,getAllfindCategory, updateCategory, deleteCategory } = require("../controller/categorizeController");

router.post("/blogCategory", createCategory);
router.get("/getcategory/:id", getCategory);
router.get("/getAllfindCategory",getAllfindCategory);
router.post("/updatecategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;