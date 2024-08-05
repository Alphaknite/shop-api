const User = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.userData.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role != "admin") {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
