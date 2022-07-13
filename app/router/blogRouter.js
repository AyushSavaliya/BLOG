const express = require("express");
const router = new express.Router();
const { createBlog,addCategory,addTag, getAllFindData, getAutherfindId, getBlogid, updateBlog, deleteBlog, getBlogByAuthor, getAllBlogs,searchQuery } = require("../controller/blogController");
const multer = require("multer");
const path = require("path");
const { Router } = require("express");
const authorVerifyToken = require("../middalver/authorAuth");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })


router.post("/blog/:id", upload.array("image",100), createBlog);
router.post("/pushcategory/:id",addCategory);
router.post("/pushtag/:id",addTag);
router.get("/getAllFindData", getAllFindData);
router.get("/getautherid/:id", getAutherfindId);
router.get("/getblogid/:id", getBlogid);
router.post("/updateBlog/:id", upload.single("image"), updateBlog);
router.delete("/deleteblog/:id", deleteBlog);
router.get('/getBlogByAuthor/:author_id', getBlogByAuthor);
router.get('/getAllBlogs', getAllBlogs);
router.get("/searchquery",searchQuery);
module.exports = router;
