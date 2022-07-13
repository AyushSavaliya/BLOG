const express = require("express");
const router = new express.Router();
const { createContact, getContactData,updateContact ,deleteContact} = require("../controller/contactController");

router.post("/createcontact", createContact);
router.get("/getcontactdata/:id", getContactData);
router.post("/updatecontact/:id",updateContact);
router.delete("/deletcontact/:id",deleteContact);

module.exports = router;