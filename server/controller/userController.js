const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { generateToken } = require('../utils/generateToken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../config/email-verification');
const { Knock }  = require("@knocklabs/node")
const knock = new Knock(process.env.KNOCK_API_KEY);


const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const getUserDetails = async (req, res, next) => {
    try {
        const { userid } = req.params;
        let user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).json({ status: "Error", response: "User not found" });
        }
        return res.status(200).json({
            status: "success",
            response: user
        });
    } catch (err) {
        next(err);
    }
};

const getUsersByName = async (req, res, next) => {
    try {
        const { search } = req.body;

        // Create a query object to filter users by role
        let query = {
            role: { $in: ['admin', 'user'] }  // Only fetch users with roles "admin" or "user"
        };

        // If search parameter is present, look for users by first name or last name
        if (search) {
            query.$or = [
                { firstname: { $regex: search, $options: 'i' } },  // Case-insensitive search by first name
                { lastname: { $regex: search, $options: 'i' } },   // Case-insensitive search by last name
                { email: { $regex: search, $options: 'i' } }        // Optional: Case-insensitive search by email
            ];
        }

        // Find users based on the constructed query
        const users = await userModel.find(query);

        if (users.length === 0) {
            return res.status(404).json({ status: "Error", response: "No users found" });
        }

        return res.status(200).json({
            status: "success",
            response: users
        });
    } catch (err) {
        next(err);
    }
};


const registerUser = async (req, res, next) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            branch,
            yearOfStudy,
            interests,
            myevents,
            contact
        } = req.body;

        // Check if required fields are present
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ status: "Error", response: "All fields are required" });
        }

        // Check if user exists
        let user = await userModel.findOne({ email });

        // If the user exists and is not verified
        if (user && !user.isVerified) {
            // Check if the verification token has expired
            if (Date.now() > user.tokenExpiry) {
                // Generate a new token and send a new verification email
                user.verificationToken = generateVerificationToken();
                user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
                await user.save();

                // Resend the verification email
               await sendVerificationEmail(user, user.verificationToken);
                return res.status(200).json({ status: "Success", response: "A new verification email has been sent" });
            } else {
                return res.status(400).json({ status: "Error", response: "Please check your email for the verification link" });
            }
        }

        // If the user is already verified
        if (user) {
            return res.status(403).json({ status: "Error", response: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Plain text password:", password);
        console.log("Hashed password:", hashedPassword);

        // Create new user
        let createdUser = await userModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            branch,
            yearOfStudy,
            interests,
            myevents,
            contact,
            isVerified: false, // Mark as unverified initially
            verificationToken: generateVerificationToken(),
            tokenExpiry: Date.now() + 3600000, // 1 hour expiry
        });

        await knock.users.identify(
            createdUser._id.toString(), {
            name: firstname + ' ' + lastname,
            email,
        });

        await createdUser.save();

        // Send verification email
      await  sendVerificationEmail(createdUser, createdUser.verificationToken);

        res.status(200).json({ status: "Success", response: 'User registered. Please verify your email.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "Error", response: "An internal server error occurred" });
    }
};



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ status: "Error", response: "Email or Password Incorrect" });
        }

        console.log("Stored password:", user.password);

        if (!user.isVerified) {
            // Check if the verification token has expired
            if (Date.now() > user.tokenExpiry) {
                // Generate a new token and send a new verification email
                user.verificationToken = generateVerificationToken();
                user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
                await user.save();

             await  sendVerificationEmail(user, user.verificationToken);
                return res.status(400).json({ status: "Error", response: "Verification token expired. A new verification email has been sent" });
            }

            return res.status(400).json({ status: "Error", response: 'Email not verified' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ status: "Error", response: "Email or Password Incorrect" });
        }

        const token = generateToken(user);
        res.cookie("token", token);

        return res.status(200).json({
            status: "Success",
            response: { user, token }
        });
    } catch (err) {
        next(err);
    }
};

const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "Error", response: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ status: "Error", response: "User is already verified" });
        }

        // Generate a new token and resend the verification email
        user.verificationToken = generateVerificationToken();
        user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

       await sendVerificationEmail(user, user.verificationToken);
        res.status(200).json({ status: "Success", response: "Verification email resent" });
    } catch (err) {
        next(err);
    }
};

const googleLogin = async (req, res, next) => {
    try {
        const { email, firstname, lastname, image } = req.body;
        // console.log("google server data: ",req.body);

        // Find user by email in the database
        const user = await userModel.findOne({ email });

        if (user) {
            // If the user exists, generate a token for login
            const token = generateToken(user);
            res.cookie("token", token);
            const { password, ...userData } = user._doc; // Exclude password when sending user data
            res.status(200).json({
                status: "Success",
                response: { user: userData, token }
            })
        } else {
            // If the user doesn't exist, create a new one
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            // Create a new user object
            const newUser = userModel({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                image,
                branch: '',
                yearOfStudy: '',
                interests: [],
                contact: ''
            });

            await newUser.save();

            await knock.users.identify(
                newUser._id.toString(), {
                name: firstname + ' ' + lastname,
                email,
            });

            const token = generateToken(newUser);
            res.cookie("token", token);
            const { password, ...userData } = newUser._doc; // Exclude password when sending user data
            res.status(201)
                .json({ user: userData, token });
        }
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};


const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const user = await userModel.findByIdAndUpdate(userId, { role }, { new: true });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User role updated", user });
    } catch (err) {
        return res.status(403).json({ message: "Error updating user role", error: err.message });
    }
};

const userUpdate = async (req, res, next) => {
    try {
        let {

            firstname,
            lastname,
            email,
            password,
            branch,
            yearOfStudy,
            interests,
            role,
            myevents,
            contact
        } = req.body;

        let updatedData = {
            firstname,
            lastname,
            email,
            branch,
            yearOfStudy,
            interests,
            role,
            myevents,
            contact
        };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        let updatedUser = await userModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(403).json({ status: "Error", response: "User not found" });
        }

        return res.status(200).json({
            status: "success",
            response: "User Details Updated"
        });
    } catch (err) {
        next(err);
    }
};

const addOrganisedEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        await userModel.findByIdAndUpdate(userId, { $push: { eventsorganised: eventId } });
        res.status(200).json({ message: "Event added to user's organised events" });
    } catch (err) {
        res.status(403).json({ message: "Failed to update user's organised events", error: err });
    }
};


const addMyEvent = async (req, res) => {
    const { userId, eventId, paymentImage } = req.body;
    console.log(req.body);

    try {
        await userModel.findByIdAndUpdate(userId, { $push: { myevents: { eventId: eventId, paymentScreenshot: paymentImage } } });
        res.status(200).json({ message: "Event added to user's events" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user's events", error: err });
    }
};


const deleteUser = async (req, res) => {
    try {
        let user = await userModel.findOneAndDelete({ _id: req.query.id });
        res.status(200).json({
            status: "success",
            response: `User deleted`
        });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};


module.exports = { getUsersByName, getUserDetails, registerUser, loginUser, googleLogin, updateUserRole, userUpdate, addOrganisedEvent, deleteUser, resendVerificationEmail, addMyEvent }