import React, { Component } from 'react';
import { useState, useContext, useReducer, useEffect } from "react";
import { StudentContext } from './context';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const Admin = () => {
    const location = useLocation();
    const { authenticated, setAuthenticated } = useContext(StudentContext)
    
    console.log("Location: ", authenticated)

    // Axios Get API 
    const [students, setStudents] = useState([]);
    const getStudents = () => {
        const url = "http://localhost:5000/api/allstudents";
        axios
            .get(url)
            .then(res => {
                setStudents(res.data)
            })
      }
    useEffect(() => {
        getStudents();
    }, []);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [courses, setCourses] = useState("");
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");

    const onSubmitForm = (event) => {
        event.preventDefault();
        // Add new courses as object
        const new_courses = {};
        for (let i = 0; i < courses.length; i++) {
            new_courses[courses[i].trim()] = 0
        }
        // Add certificates as object 
        let keys = Object.keys(new_courses);
        const new_certificates = {};
        for (let j = 0; j < keys.length; j++) {
            new_certificates[keys[j]] = "0"
        }
        // Create new student as object
        const aStudent = {
            "name": name,
            "gender": gender,
            "email": email,
            "phone": phone,
            "address": address,
            "courses": new_courses,
            "certificates" : new_certificates,
            "category": {
                "classification": category,
                "status": 0
            }
        }
        console.log(aStudent)
        addStudent(aStudent)
        // Reset values
        setName("");
        setGender("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCourses("");
        setCategory("");

    }

    const addStudent = (aStudent) => {
        const url = `http://localhost:5000/api/addstudent`;
        axios.post(url, aStudent).then(() => {
            getStudents()
          })
    }

    const deleteStudent = (id) => {
        const url = `http://localhost:5000/api/updatestudent/${id}`;
        axios.delete(url).then(() => {
            getStudents()
          })
    }

    const viewDetail = (id) => {
        var url = "/detail/" + id
        window.location.href = url;
    }

    const onChangeGender = (event) => {
        setGender(event.target.value);
    }

    const onAddCourses = (event) => {
        const arrCourses = event.target.value.split(",")
        setCourses(arrCourses)
    }

    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const noContacts = students.filter((student) => student.category.classification == "Contact").length
    const noStudents = students.filter((student) => student.category.classification == "Student").length
    const activeStudents = students.filter((student) => student.category.classification == "Student" && student.category.status == 1).length
    const inactiveStudents = students.filter((student) => student.category.classification == "Student" && student.category.status == 0).length

    if (!authenticated) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div className='wrapper'>
                    <div className="addStudent">
                        <form className="studentInfo" onSubmit={onSubmitForm}>
                            <h2>ADD A NEW CONTACT/STUDENT</h2>
                            <div className="item">
                                <p>Full name</p>
                                <input type="name" name="name" placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required/>
                            </div>
                            <div className="gender">
                                <p>Gender</p>
                                <div className="gender-answer" onChange={onChangeGender}>
                                    <input type="radio" value="Male" id="radio_1" name="gender" defaultChecked={gender === "Male"} />
                                    <label htmlFor="radio_1" className="radio"><span>Male</span></label>
                                    <input type="radio" value="Female" id="radio_2" name="gender" defaultChecked={gender === "Female"} />
                                    <label htmlFor="radio_2" className="radio"><span>Female</span></label>
                                    <input type="radio" value="Other" id="radio_3" name="gender" defaultChecked={gender === "Other"} />
                                    <label htmlFor="radio_3" className="radio"><span>Other</span></label>
                                </div>
                            </div>
                            <div className="item">
                                <p>Email</p>
                                <input type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                            </div>
                            <div className="item">
                                <p>Phone number</p>
                                <input type="phone" name="phone" placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} required/>
                            </div>
                            <div className="item">
                                <p>Address</p>
                                <input type="address" name="address" placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)} required/>
                            </div>
                            <div className="item">
                                <p>Courses</p>
                                <input type="phone" name="phone" placeholder="Enter multiple courses seperated by comma" value={courses} onChange={onAddCourses} multiple />
                            </div>
                            <div className="category">
                                <p>Category</p>
                                <div className="category-answer" onChange={onChangeCategory}>
                                    <input type="radio" value="Contact" id="type_1" name="category" defaultChecked={category === "Contact"} />
                                    <label htmlFor="type_1" className="type"><span>Contact</span></label>
                                    <input type="radio" value="Student" id="type_2" name="category" defaultChecked={category === "Student"} />
                                    <label htmlFor="type_2" className="type"><span>Student</span></label>
                                </div>
                            </div>

                            <button className='addSubmit'>
                                ADD
                            </button>
                        </form>
                    </div>
                    <div className="stats">
                        <h2>BASIC STATISTICS</h2>
                        <img src={require("../images/student.png")} alt="Find a student" />
                        <table>
                            <tbody>
                                <tr>
                                    <td>No. Contacts</td>
                                    <td>{noContacts}</td>
                                </tr>
                                <tr>
                                    <td>No. Students</td>
                                    <td>{noStudents}</td>
                                </tr>
                                <tr>
                                    <td>No. Inactive students</td>
                                    <td>{inactiveStudents}</td>
                                </tr>
                                <tr>
                                    <td>No. Active students</td>
                                    <td>{activeStudents}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className='detail'>
                    <h2>ALL STUDENTS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Detail</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {
                                const res =
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.address}</td>
                                        <td>{student.category.classification}</td>
                                        <td>{student.category.status}</td>
                                        <td><button className='viewDetail' onClick={() => viewDetail(student._id)} >View</button></td>
                                        <td><button className='deleteStudent' onClick={() => deleteStudent(student._id)} >Delete</button></td>
                                    </tr>
                                return res
                            })}

                        </tbody>

                    </table>
                </div>
                <br />
            </>
        );
    }
}

export default Admin;