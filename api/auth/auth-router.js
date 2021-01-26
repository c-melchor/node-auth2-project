const brcypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const secret = require("../config/secrets");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../users/users-model");
const { validUserBody } = require("../middleware/middleware")


router.post("/register", validUserBody, (req, res) => {
    const user = req.body;
    const hashed = brcypt.hashSync(user.password, 10);
    if (user) {
        user.password = hashed;
        Users.add(user)
            .then(newUser => res.status(201).json(newUser))
            .catch(error => res.status(500).json({ message: error.message }))
    } else {
        res.status(400).json({ message: "Please provide valid credentials" })
    }
});

module.exports = router;
