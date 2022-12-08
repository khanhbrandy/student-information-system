const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name cannot be empty"]
        },
        gender: {
            type: String,
            required: [true, "Gender cannot be empty"]
        },
        email: {
            type: String,
            required: [true, "Email cannot be empty"]
        },
        phone: {
            type: String,
            required: [true, "Phone cannot be empty"]
        },
        address: {
            type: String,
            required: [true, "Address cannot be empty"]
        },
        courses: {
            SQL: Number,
            Python: Number,
            PowerBI: Number
        },
        certificates: {
            SQL: String,
            Python: String,
            PowerBI: String
        },
        category: {
            classification: String,
            status: Number
        }
    },
    {
        versionKey: false 
    }
)

const Student = mongoose.model("Student", studentSchema)

module.exports = Student;