const db = require("../../database/db-config");
const express = require("express");
const router = express.Router();

async function validUserBody(req, res, next) {
    const user = req.body;
    const validUserBody = await user.username && user.password && user.department;
    try {
        if (validUserBody) {
            next();
        }
        else {
            res.status(404).json("Invalid credentials");
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { validUserBody };
