const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const isUserLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      status: "Error",
      response: "You need to login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "Error",
        response: "User not found.",
      });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (err) {
    return res.status(403).json({
      status: "Error",
      response: "Invalid or expired token.",
    });
  }
};


const isAdminLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      status: "Error",
      response: "You need to login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!admin || (admin.role !== 'admin' && admin.role !== 'superadmin')) {
      return res.status(403).json({
        status: "Error",
        response: "Access denied. Admins only.",
      });
    }

    req.admin = admin; // Attach admin to the request object
    next();
  } catch (err) {
    return res.status(403).json({
      status: "Error",
      response: "Invalid or expired token.",
    });
  }
};


module.exports = { isUserLoggedIn, isAdminLoggedIn };
