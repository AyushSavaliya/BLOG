const express = require("express");
const router = new express.Router();
const { createAdminuser,getAllFindData ,updateAdminData,deleteAdminData,adminUserLogin} = require("../controller/adminController");
const multer = require("multer");
const path = require("path");
const adminVerifyToken = require("../middalver/authorAuth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../profileimage'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })


router.post("/createadminuser", upload.single("image"), createAdminuser);
router.post("/adminuserlogin",adminVerifyToken,adminUserLogin);
router.get("/getadmindata",getAllFindData);
router.post("/updateadmindata/:id",updateAdminData);
router.delete("/deleteadmindata/:id",deleteAdminData);

module.exports = router