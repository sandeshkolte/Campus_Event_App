const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
}

module.exports.generateToken = generateToken