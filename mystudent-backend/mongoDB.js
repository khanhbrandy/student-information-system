const mongoose = require("mongoose");
const fs = require('fs');
// Import schemas
const Student = require("./models/students.js")
const User = require("./models/users.js")

// MongoDB connection
const url = "mongodb://localhost:27017/mystudentDB";
mongoose.connect(url);
console.log("My Student database connected")


const insertStudents = () => {
    // Get raw data
    let raw_students_data = fs.readFileSync('students.json');
    let students_data = JSON.parse(raw_students_data);
    // Insert data into MongodDB
    for (let i = 0; i < students_data.length; i++) {
        const student = new Student(students_data[i])
        student.save((err) => {
            if (err) {
                console.log("ERROR: ", err)
            } else {
                console.log(`Document ${i} inserted successfully`)
            }
        })
    }

}

const insertUsers = () => {
    // Get raw data
    let raw_users_data = fs.readFileSync('users.json');
    let users_data = JSON.parse(raw_users_data);
    // Insert data into MongodDB
    for (let i = 0; i < users_data.length; i++) {
        const user = new User(users_data[i])
        user.save((err) => {
            if (err) {
                console.log("ERROR: ", err)
            } else {
                console.log(`Document ${i} inserted successfully`)
            }
        })
    }

}

insertStudents();
insertUsers();

// !!!! Close the connection
// mongoose.connection.close();