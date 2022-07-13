const Contact = require("../model/contactModel");

const createContact = async(req,res) => {
    try {
        const userdata = new Contact({
            username:req.body.username,
            email:req.body.email,
            message:req.body.message
        });
        const contactdata = await userdata.save();

        res.status(201).send(contactdata);

    } catch (error) {
        res.status(401).send(error)
    }
}

const getContactData =  async (req, res) => {
    try {
        const _id = req.params.id;
        const response = await Contact.findById(_id);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send(error)
    }
};


const updateContact  = async(req,res) => {
    const _id = req.params.id;
    try {
        const updateContactData = await Contact.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send(updateContactData);
    } catch (error) {
        res.status(400).send(error);
    }
}
const deleteContact = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteData = await Contact.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {createContact,getContactData,updateContact,deleteContact}