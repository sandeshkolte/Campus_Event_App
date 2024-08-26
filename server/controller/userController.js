const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const { generateToken } = require('../utils/generateToken')


const getUserDetails = async (req, res) => {

    try {

        const { userid } = req.query

        let user = await userModel.findById(userid)

        if (!user) {
            return res.status(403).json({
                status: "Error",
                response: "no User"
            })
        }
        else {
            return res.status(200).json({
                status: "success",
                response: user
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Error",
            response: `Error: ${err.message}`
        });
    }
}

const registerUser = async (req, res) => {

    const { username,
        fullname,
        email,
        password,
        image,
        myevents,
        contact } = req.body

    let user = await userModel.findOne({ email })

    if (user) {
        return res.status(403).json({
            status: "Error",
            response: "User already exist"
        })
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                if (err) return res.status(403).json({
                    status: "Error",
                    response: err.message
                })
                else {
                    let createdUser = await userModel.create({
                        username,
                        fullname,
                        email,
                        image: req.file.buffer,
                        myevents,
                        contact, password: hash
                    })

                    const token = generateToken(createdUser)
                    res.cookie("token", token)

                    res.status(200).json({
                        status: "Success",
                        response: { createdUser, token }
                    })

                }
            })
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    let user = await userModel.findOne({ email })

    if (!user) {
        return res.status(403).json({
            status: "Error",
            response: "Email or Password Incorrect"
        })
    } else {

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = generateToken(user)
                res.cookie("token", token)
                res.status(200).json({
                    status: "Success",
                    response: { user, token }
                })
            } else {
                res.status(403).json({
                    status: "Error",
                    response: "Email or Password Incorrect"
                })
            }

        })
    }

}

module.exports = { getUserDetails, registerUser, loginUser }