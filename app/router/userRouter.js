const express = require("express");
const router = new express.Router();
const { register, getUserallfind, login, getUserData, updateUserData, deleteUser } = require("../controller/userControlloer");
const auth = require("../middalver/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser",auth, getUserallfind);
router.get("/getUserData/:id", getUserData);
router.post("/updateUser/:id", updateUserData);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;