


router.get('/students', async (req, res) => {
    try {
        const { department, role } = req.user; // Superadmin's branch
        if (role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const students = await User.find({ role: "user", department }).select("-password");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
});
