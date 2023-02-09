const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        timestamps: true
    }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema)