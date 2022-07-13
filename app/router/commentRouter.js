const express = require("express");
const async = require("hbs/lib/async");
const router = express.Router();
const { createComment, getComment, updateComment, deleteComment } = require("../controller/commentController");


router.post("/comment/:id", createComment);
router.get("/getcomment/:id", getComment);
router.post("/updatecomment/:id", updateComment);
router.delete("/deletecomment/:id", deleteComment);
module.exports = router;
