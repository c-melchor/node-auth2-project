const db = require("../../database/db-config");
const express = require("express");
const router = express.Router();

async function validUserBody(req, res, next) {
    const user = req.body;
    const validUserBody = await user.username && user.password && user.description
    try {
        if (validUserBody) {
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { validUserBody }
