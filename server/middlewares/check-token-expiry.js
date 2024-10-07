const User = require('../models/user');

const checkTokenExpiry = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user) {
      // If user exists and is not verified
      if (!user.isVerified && user.tokenExpiry && user.tokenExpiry < Date.now()) {
        // If token has expired, delete the unverified user
        await User.deleteOne({ email });
        return res.status(400).json({
          message: 'Your verification token has expired. Please register again.',
        });
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = checkTokenExpiry 