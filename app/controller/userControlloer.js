const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const register = async (req, res) => {
    try {
        const userdata = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        userdata.password = await bcrypt.hash(userdata.password, 10);
        const blogdata = await userdata.save();
        res.status(201).send(blogdata);
    } catch (error) {
        res.status(401).send(error)
    }
}
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userLogin = await User.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, userLogin.password);
        if (ismatch) {
            const token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2598000000),
                httpOnly: true,
            });
            res.status(200).send(userLogin);
        } else {
            res.status(400).send("password is not same");
        }

    } catch (error) {
        res.status(400).send("password is not same",error.message);
    }
}
const getUserallfind = async (req, res) => {
    try {
        const response = await User.find({ name: { $regex: req.query.name } });
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error);
    }
}
const getUserData = async (req, res) => {
    const _id = req.params.id;

    try {
        const logindata = await User.findById(_id);
        res.status(200).send(logindata);
    } catch (error) {
        res.status(400).send(error);
    }
}
const updateUserData = async (req, res) => {
    const _id = req.params.id;
    try {
        const updateData = await User.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send(updateData);
    } catch (error) {
        res.status(400).send(error);
    }
}
const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteData = await User.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = { register, login, getUserallfind, getUserData, updateUserData, deleteUser };