const jwt = require('jsonwebtoken')
require('dotenv').config()

async function isAuth(req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "login required" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded  
        next()   

    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token, login again" })
    }
}

module.exports = isAuth