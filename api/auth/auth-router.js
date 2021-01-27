const brcypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../users/users-model");
const { validUserBody } = require("../middleware/middleware");
const { generateToken } = require("../token/token");

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

router.post("/login", validUserBody, (req, res) => {
    const { username, password } = req.body;
    Users.getBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(generateToken(user), "FUNC")
                const token = generateToken(user);
                res.status(200).json({ message: "Velcome", token })
            } else {
                res.status(401).json({ message: "Invalid credentials" })
            }
        })
        .catch(err => { res.status(500).json({ message: err.message }) })
});

module.exports = router;
