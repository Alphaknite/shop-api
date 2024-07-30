const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { newUserLog } = require("../../utils/logEvents");
const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

myEmitter.on("userLog", (email) => {
    newUserLog(email);
});

module.exports = {
    signup: async (req, res, next) => {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" });
            }
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ erro: err });
                } else {
                    const user = await User.create({
                        email: req.body.email,
                        password: hash,
                    });
                    res.status(201).json({ message: "User Created!" });
                    myEmitter.emit("userLog", user.email);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ message: "Authorization Failed" });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res
                        .status(401)
                        .json({ message: "Authorization Failed" });
                }
                if (result) {
                    const token = jwt.sign(
                        { email: user.email, userId: user._id },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h",
                        }
                    );
                    return res
                        .status(200)
                        .json({ message: "Authorization Success", token: token });
                }
                return res.status(401).json({ message: "Authorization Failed" });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id);
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "User deleted",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}