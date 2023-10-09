const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    
    if(!authorization){
        res.status(401).json({ error: "Authentication is required."})
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.TOKEN)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Authentication is invalid."})
    }
}

module.exports = requireAuth