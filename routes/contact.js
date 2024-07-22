const express = require("express");

const router = express.Router();

const {saveMessage} = require("../controllers/contact.js");


router.post('/save', saveMessage);

module.exports = router;