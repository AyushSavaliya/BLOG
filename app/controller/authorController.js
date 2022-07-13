const Author = require("../model/authorModel");
const ObjectId = require('mongodb').ObjectID;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser")

const createAuthor = async (req, res) => {
    try {
        if (req.file) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }
            // base64 string
            var base64Str = base64_encode(req.file.path)

            // image url
            var url = `data:${req.file.mimetype};base64,${base64Str}`
            // console.log(url);
        }
        const author = new Author({
            image: url,
            author_name: req.body.author_name,
            profession: req.body.profession,
            author_email: req.body.author_email,
            author_password: req.body.author_password,
            description: req.body.description,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter
        });

        author.author_password = await bcrypt.hash(author.author_password, 10);
        const authSave = await author.save();
        res.status(201).json({message:"user register successfully",error:"flase"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const author_email = req.body.author_email;
        const author_password = req.body.author_password;
        const authorLogin = await Author.findOne({ author_email: author_email });
        const isMatch = await bcrypt.compare(author_password, authorLogin.author_password);
        if (isMatch) {
            const token = await authorLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2598000000),
                httpOnly: true,
            });
            res.status(201).send(authorLogin);
        } else {
            res.status(401).send("password is not correct");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
}
const getauthorallfind = async (req, res) => {
    try {
        const response = await Author.find();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error);
    }
}


const updateAuthor = async (req, res) => {
    try {
        if (req.file) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }
            // base64 string
            var base64Str = base64_encode(req.file.path)

            // image url
            var url = `data:${req.file.mimetype};base64,${base64Str}`
            // console.log(url);
        }

        const _id = req.params.id;
        const updateData = await Author.findByIdAndUpdate(_id, {
            image: url,
            author_name: req.body.author_name,
            profession: req.body.profession,
            description: req.body.description,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter
        }, { new: true });
        res.status(200).send(updateData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteAuthor = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await Author.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getAuthorDetail = async (req,res) =>{
    res.send(req.rootAuthor);
}
module.exports = { createAuthor, login, getauthorallfind, updateAuthor, deleteAuthor, getAuthorDetail };