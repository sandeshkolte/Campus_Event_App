const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { generateToken } = require('../utils/generateToken');

const getUserDetails = async (req, res, next) => {
    try {
        const { userid } = req.query;
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

const getUserByRole = async (req, res, next) => {
    try {
        const { role } = req.query;

        // Split the role query param by commas and use the $in operator for roles.
        const roles = role ? role.split(',') : [];

        // Find users with roles that match either 'user' or 'admin'
        const users = await userModel.find({ role: { $in: roles } });

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
            username, 
            fullname, 
            email, 
            password, 
            department, 
            yearOfStudy, 
            studentID, 
            clubs, 
            skills, 
            myevents, 
            contact 
        } = req.body;

        // Check if user exists before proceeding
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(403).json({ status: "Error", response: "User already exists" });
        }

        // Hash password asynchronously using await
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        let createdUser = await userModel.create({
            username,
            fullname,
            email,
            password: hashedPassword,
            department,
            yearOfStudy,
            studentID,
            clubs,
            skills,
            myevents,
            contact
        });

        // Generate token and set cookie
        const token = generateToken(createdUser);
        res.cookie("token", token);

        return res.status(201).json({
            status: "Success",
            response: { createdUser, token }
        });
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch user by email
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ status: "Error", response: "Email or Password Incorrect" });
        }

        // Check password validity
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ status: "Error", response: "Email or Password Incorrect" });
        }

        // Generate token and set cookie
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

const updateUserRole = async (req, res) => {
    try {
      const { userId, role } = req.body;
    //   console.log(req.body);
      const user = await userModel.findByIdAndUpdate(userId, { role }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User role updated", user });
    } catch (err) {
      return res.status(500).json({ message: "Error updating user role", error: err.message });
    }
  };
  

const userUpdate = async (req, res, next) => {
    try {
        let { 
            username, 
            fullname, 
            email, 
            password, 
            department, 
            yearOfStudy, 
            studentID, 
            clubs, 
            skills, 
            role, 
            myevents, 
            contact 
        } = req.body;

        // Prepare updated data
        let updatedData = { 
            username, 
            fullname, 
            email, 
            department, 
            yearOfStudy, 
            studentID, 
            clubs, 
            skills, 
            role, 
            myevents, 
            contact 
        };

        // Hash new password if provided
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        // Update user details
        let updatedUser = await userModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: "Error", response: "User not found" });
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
    console.log(req.body);
    
    try {
      // Find the user and add the event ID to eventsorganised
      await userModel.findByIdAndUpdate(userId, { $push: { eventsorganised: eventId } });
      res.status(200).json({ message: "Event added to user's organised events" });
    } catch (err) {
      res.status(500).json({ message: "Failed to update user's organised events", error: err });
    }
  }

  const deleteUser = async (req, res) => {
    try {
        console.log(req.query.id);
        let user = await userModel.findOneAndDelete({ _id: req.query.id });
        res.status(200).json({
            status: "success",
            response: `User deleted`
        })
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
    }
};


module.exports = { getUserDetails, registerUser, loginUser, userUpdate, 
    updateUserRole, getUserByRole,addOrganisedEvent,deleteUser };
