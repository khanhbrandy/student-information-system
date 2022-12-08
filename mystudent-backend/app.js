const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

const Student = require("./models/students.js")
const User = require("./models/users.js")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static("public"))


// MongoDB connections
const url = "mongodb://localhost:27017/mystudentDB";

//////////////////////////////////////////////
//// 1. READ STUDENT

app.get("/api/allstudents", async (req, res) => {
    try {
        await mongoose.connect(url);
        console.log("Database connected to get all student information");
        Student.find((err, student) => {
            if (err) {
                res.send("ERROR: ", err)
            } else {
                res.send(JSON.stringify(student))
                mongoose.connection.close();
            }
        })
    }
    catch (err) {
        console.log("ERROR: ", err)
    }
})
// Find a student by ID
app.get("/api/findstudent/:id", async (req, res) => {
    let _id = req.params.id;
    _id = mongoose.Types.ObjectId(_id)
    try {
        await mongoose.connect(url);
        console.log("Database connected to find a student");
        Student.find(
            { _id: _id },
            (err, student) => {
                if (err) {
                    res.send("ERROR: ", err)
                } else {
                    res.send(JSON.stringify(student))
                    mongoose.connection.close();
                }
            })
    }
    catch (err) {
        console.log("ERROR: ", err)
    }
})

// Find a student by Email
app.get("/api/findcertificate/:email", async (req, res) => {
    let email = req.params.email;
    try {
        await mongoose.connect(url);
        console.log("Database connected to find a student");
        Student.find(
            { email: email },
            (err, student) => {
                if (err) {
                    res.send("ERROR: ", err)
                } else {
                    res.send(JSON.stringify(student))
                    mongoose.connection.close();
                }
            })
    }
    catch (err) {
        console.log("ERROR: ", err)
    }
})

//// 2. UPDATE STUDENT
app.put("/api/updatestudent/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id)
        await mongoose.connect(url);
        console.log("Database connected to update a student");

        Student.findByIdAndUpdate(
            { _id: _id },
            req.body,
            (err, doc) => {
                if (err) {
                    res.send("ERROR: ", err)
                } else if (doc == null) {
                    res.send(`No matching student found`)
                    console.log("No matching student found")
                } else {
                    res.send(`Student ${doc.name} updated successfully`)
                    console.log(`Student ${doc.name} updated successfully`)    
                }
                mongoose.connection.close();
            }
        )
    }
    catch (error) {
        console.log("ERROR: ", error)
    }
})

// //////////////////////////////////////////////
// //// 3. DELETE STUDENT
app.delete("/api/updatestudent/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        _id = mongoose.Types.ObjectId(_id)

        await mongoose.connect(url);
        console.log("Database connected to delete a student");

        Student.findByIdAndDelete(
            { _id: _id },
            (err, doc) => {
                if (err) {
                    res.send("ERROR: ", err)
                } else if (doc == null) {
                    res.send(`No matching student found`)
                    console.log("No matching student found")
                } else {
                    res.send(`Student ${doc.name} deleted successfully`)
                    console.log(`Student ${doc.name} deleted successfully`)    
                }
                mongoose.connection.close();
            }
        )

    }
    catch (error) {
        console.log("ERROR: ", error)
    }
})

// //////////////////////////////////////////////
// //// 4. ADD STUDENT
app.post("/api/addstudent", async (req, res) => {
    try {
        const { name, gender, email, phone, address, courses, certificates, category } = req.body;
        console.log(name, gender, email, phone, address, courses, certificates, category)
        const student = new Student({
            name, gender, email, phone, address, courses, certificates, category
        })

        await mongoose.connect(url);
        console.log("Database connected to insert a new student");
        student.save((err) => {
            if (err) {
                console.log("ERROR: ", err)
            } else {
                console.log("Student inserted successfully");
                res.send("Student inserted successfully")
                mongoose.connection.close();
            }
        })
    }
    catch (error) {
        console.log("ERROR: ", error)
    }
})

//////////////////////////////////////////////
//// 5. READ USER
app.get("/api/finduser/:uname", async (req, res) => {
    let uname = req.params.uname;
    try {
        await mongoose.connect(url);
        console.log("Database connected to find a user");
        User.find(
            { uname: uname },
            (err, user) => {
                if (err) {
                    res.send("ERROR: ", err)
                } else {
                    res.send(JSON.stringify(user))
                    mongoose.connection.close();
                }
            })
    }
    catch (err) {
        console.log("ERROR: ", err)
    }
})


// Server listening on port 5000
const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})