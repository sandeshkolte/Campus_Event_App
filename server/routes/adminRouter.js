const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/students', async (req, res) => {
    try {
        const { branch, role } = req.body; 

        // Only allow Superadmins to fetch students
        if (role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }

        // Fetch students only from the given department
        const students = await User.find({ }).select("-password");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
});


router.put('/update-role/:id', async (req, res) => {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error });
    }
});



module.exports = router