const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json("VALID token, please");
            } else {
                req.decodedJwt = decoded;
                next();
            }
        })
    } else {
        res.status(401).json("Valid token needed")
    }
}