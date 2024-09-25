const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const isUserLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(403).json({
      status: "Error",
      response: "You need to login first",
    });
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel.findOne({ email: decoded.email }).select("-password");
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const isAdminLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(403).json({
      status: "Error",
      response: "You need to login first",
    });
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let admin = await userModel.findOne({ email: decoded.email }).select("-password");

    // Check if the user has an admin role
    if (admin && admin.role === 'admin' || 'superadmin') {
      req.admin = admin;
      next();
    } else {
      return res.status(403).json({
        status: "Error",
        response: "Access denied. Admins only.",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isUserLoggedIn, isAdminLoggedIn };
