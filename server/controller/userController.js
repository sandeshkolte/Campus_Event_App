const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const { generateToken } = require('../utils/generateToken')


const getUserDetails = async (req, res, next) => {

    try {

        const { userid } = req.query

        let user = await userModel.findById(userid)

        // if (!user) {
        //     return res.status(403).json({
        //         status: "Error",
        //         response: "no User"
        //     })
        // }
        if (user) {
            return res.status(200).json({
                status: "success",
                response: user
            })
        }
    } catch (err) {
        // res.status(500).json({
        //     status: "Error",
        //     response: `Error: ${err.message}`
        // });
        next(err)
    }
}

const registerUser = async (req, res, next) => {

    const { username,
        fullname,
        email,
        password,
        // image,
        role,
        myevents,
        contact } = req.body

    let user = await userModel.findOne({ email })

    if (user) {
        // return res.status(403).json({
        //     status: "Error",
        //     response: "User already exist"
        // })
        const message = "User already exist"
        const error = {
            message
        }

        next(error)
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                if (err) next(err)
                //     return res.status(403).json({
                //     status: "Error",
                //     response: err.message
                // })
                else {
                    let createdUser = await userModel.create({
                        username,
                        fullname,
                        email,
                        // image: req.file.buffer,
                        myevents,
                        contact,
                        password: hash
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

const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    let user = await userModel.findOne({ email })

    if (!user) {
        // return res.status(403).json({
        //     status: "Error",
        //     response: "Email or Password Incorrect"
        // })
        const message = "Email or Password Incorrect"

        const error = {
            message
        }
        next(error)

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
                // res.status(403).json({
                //     status: "Error",
                //     response: "Email or Password Incorrect"
                // })
                const message = "Email or Password Incorrect"

                const error = {
                    message
                }
                next(error)
            }

        })
    }

}


const userUpdate = async (req, res) => {
    try {

        let { username,
            fullname,
            email,
            password,
            // image,
            role,
            myevents,
            contact } = req.body;

        let updatedUser = await eventModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                // image:req.file.buffer,
                username,
                fullname,
                email,
                password,
                // image,
                contact
            },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            response: "Event Updated"
        })

    }

    catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};


module.exports = { getUserDetails, registerUser, loginUser }