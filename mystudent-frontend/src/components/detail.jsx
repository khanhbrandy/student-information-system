import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { StudentContext } from './context';
import axios from 'axios';

const Detail = () => {
    const params = useParams()
    const { students } = useContext(StudentContext)
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [courses, setCourses] = useState("");
    const [category, setCategory] = useState("");

    // Axios Get API 
    const aStudent = {
        "courses": {
            "SQL": 0,
            "Python": 0,
            "PowerBI": 0
        },
        "certificates": {
            "SQL": "0",
            "Python": "0",
            "PowerBI": "0"
        },
        "category": {
            "classification": "Contact/Student",
            "status": 0
        },
        "_id": "0",
        "name": "Full Name",
        "gender": "Gender",
        "email": "Email",
        "phone": "Phone Number",
        "address": "Address"
    }
    const [student, setStudent] = useState(aStudent);
    const getStudent = () => {
        const url = `http://localhost:5000/api/findstudent/${params.id}`;
        axios
            .get(url)
            .then(res => {
                setStudent(res.data[0])
                // console.log(student)
            })
    }
    useEffect(() => {
        getStudent();
    }, []);

    const updateDetail = (student) => {
        const url = `http://localhost:5000/api/updatestudent/${params.id}`;
        axios.put(url, student).then(() => {
            getStudent()
          })
        window.alert(`Updated Successfully`)
    }

    const updateName = (student) => {
        student.name = name
        updateDetail(student)
        setName("")
    }

    const updateGender = (student) => {
        student.gender = gender
        updateDetail(student)
        setGender("")
    }

    const updateEmail = (student) => {
        student.email = email
        updateDetail(student)
        setEmail("")
    }

    const updatePhone = (student) => {
        student.phone = phone
        updateDetail(student)
        setPhone("")
    }

    const updateAddress = (student) => {
        student.address = address
        updateDetail(student)
        setAddress("")
    }

    const updateCategory = (student) => {
        student.category.classification = category
        updateDetail(student)
    }

    const backAdmin = () => {
        var url = "/admin"
        window.location.href = url;
    }

    return (
        <>
            <div className="studentInforBoard">
                <h2>EDIT STUDENT/CONTACT INFORMATION</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{student.name}</td>
                            <td><input type="name" name="name" placeholder=" Enter new name here" value={name} onChange={(event) => setName(event.target.value)} /></td>
                            <td><button className='updateDetail' onClick={() => updateName(student)} >Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Gender</b></td>
                            <td>{student.gender}</td>
                            <td>
                                <select id="updateGender" defaultValue={student.gender} onChange={(event) => setGender(event.target.value)} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                            <td><button className='updateDetail' onClick={() => updateGender(student)} >Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>{student.email}</td>
                            <td><input type="email" name="email" placeholder=" Enter new email here" value={email} onChange={(event) => setEmail(event.target.value)} /></td>
                            <td><button className='updateDetail' onClick={() => updateEmail(student)} >Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Phone</b></td>
                            <td>{student.phone}</td>
                            <td><input type="phone" name="phone" placeholder=" Enter new phone here" value={phone} onChange={(event) => setPhone(event.target.value)} /></td>
                            <td><button className='updateDetail' onClick={() => updatePhone(student)} >Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>{student.address}</td>
                            <td><input type="address" name="address" placeholder=" Enter new address here" value={address} onChange={(event) => setAddress(event.target.value)} /></td>
                            <td><button className='updateDetail' onClick={() => updateAddress(student)} >Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Category</b></td>
                            <td>{student.category.classification}</td>
                            <td>
                                <select id="updateCategory" defaultValue={student.category.classification} onChange={(event) => setCategory(event.target.value)}>
                                    <option value="Contact">Contact</option>
                                    <option value="Student">Student</option>
                                </select>
                            </td>
                            <td><button className='updateDetail' onClick={() => updateCategory(student)} >Update</button></td>
                        </tr>
                    </tbody>
                </table>
                <button className='backAdmin' onClick={backAdmin}>
                    BACK TO ADMIN PAGE
                </button>
            </div>
            <br />
        </>
    );
}

export default Detail;