const express = require("express");
const router = new express.Router();
const { createAuthor, login, getauthorallfind, updateAuthor, deleteAuthor, getAuthorDetail } = require("../controller/authorController");
const multer = require("multer");
const path = require("path");
const authorVerifyToken = require("../middalver/authorAuth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../autherimage'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })

router.post("/createather", upload.single("image"), createAuthor);
router.post("/loginauthor", login);
router.get("/getAllauther",authorVerifyToken ,getauthorallfind);
router.post("/updateauther/:id", upload.single("image"), updateAuthor);
router.delete("/deleteauther/:id", deleteAuthor);
router.get("/getAuthorDetail", authorVerifyToken, getAuthorDetail);
module.exports = router;