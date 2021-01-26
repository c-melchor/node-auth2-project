const brcypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const secret = require("../config/secrets");
const jwt = require("jsonwebtoken")
const { validUserBody } = require("../middleware/middleware")


router.post("/register", validUserBody, async (req, res) => {
    try {
        console.log("hello")
    }
    catch (error) {

    }
})

module.exports = router;
