const express = require("express");
const router = new express.Router();
const { createTag, getTag,getAllfindTag,updateTag, deleteTag } = require("../controller/tagController");
const auth = require("../middalver/auth");

router.post("/tag", createTag);
router.get("/gettag/:id",auth , getTag);
router.get("/getAllfindTag",getAllfindTag);
router.post("/updatetag/:id", updateTag);
router.delete("/deletetag/:id", deleteTag);

module.exports = router;