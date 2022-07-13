const adminUser = require("../model/adminModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const createAdminuser = async (req, res) => {
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
        }
        const userAdmindata = new adminUser({
            profile_image:url,
            admin_name: req.body.admin_name,
            admin_username: req.body.admin_username,
            admin_email: req.body.admin_email,
            admin_password: req.body.admin_password
        });
        const token =  jwt.sign({ _id: req.body.id }, "admintokengenret");
        userAdmindata.tokens = userAdmindata.tokens.concat({ token: token });

        userAdmindata.admin_password = await bcrypt.hash(userAdmindata.admin_password, 10);

        const adminData = await userAdmindata.save();
        res.status(201).send(adminData);
    } catch (error) {
        res.status(400).send(error)
    }
}

const adminUserLogin = async(req,res) => {
    try {
        const admin_email = req.body.admin_email;
        const admin_password = req.body.admin_password;
        const user = await adminUser.findOne({ admin_email: admin_email });

        const ismatch = await bcrypt.compare(admin_password, user.admin_password);

      
        if (ismatch) {
            res.status(200).send(user);
        } else {
            res.status(400).send("password is not same");
        }

    } catch (error) {
        res.status(400).send("invalid email");
    }
}

const getAllFindData = async (req, res) => {
    try {
        const response = await adminUser.find();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error);
    }
}
const updateAdminData = async (req, res) => {
    const _id = req.params.id;
    try {
        const updateData = await adminUser.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send(updateData);
    } catch (error) {
        res.status(400).send(error);
    }
}
const deleteAdminData = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteData = await adminUser.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {createAdminuser,getAllFindData,updateAdminData,deleteAdminData,adminUserLogin};