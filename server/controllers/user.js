const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const generateToken = require('../config/generateToken');
const bcrypt = require("bcryptjs");
module.exports.register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Enter all the field");

    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409).send("User already exists");
        throw new Error("User already exists");
    }

    const user = new User({
        username,
        email,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save()
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        console.log(error)("User not found");
    }
})
module.exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid Email or Password");

    }
    const cmp = await bcrypt.compare(password, user.password);
    if (user && cmp) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");

    }
})
module.exports.allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    const users = await User.find({ username: new RegExp(keyword, 'i') })
    console.log(users)
    res.send(users);
});