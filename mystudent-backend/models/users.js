const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        uname: {
            type: String,
            required: [true, "Username cannot be empty"]
        },
        pwd: {
            type: String,
            required: [true, "Password cannot be empty"]
        },
        role: {
            type: String,
            required: [true, "Role cannot be empty"]
        }
    },
    {
        versionKey: false 
    }
)

const User = mongoose.model("User", usersSchema)

module.exports = User;