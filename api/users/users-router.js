const express = require("express");
const User = require("./users-model");
const router = express.Router();
const security = require("../middleware/restricted-middleware");


router.get("/", security, async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
});

module.exports = router;