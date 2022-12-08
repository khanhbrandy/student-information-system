import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react";
import { Outlet } from 'react-router-dom';
import { StudentContext } from './context';
import axios from 'axios';

const Certificates = () => {

    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [img, setImg] = useState("404.jpeg");
    const [msg, setMsg] = useState("");

    // Fetch API
    const requestOptions = {
        method: 'GET',
        headers: { 'X-Api-Key': 'jJZsuX/1mLS3SO1IdcPRNw==q4KVUGgjYYhlo7M9' },
    };
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://api.api-ninjas.com/v1/quotes?category=knowledge', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const quoteStr = data[0].quote
                setPosts(quoteStr);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Find student by email
    const findCertificate = (email, course) => {
        const url = `http://localhost:5000/api/findcertificate/${email}`;
        axios
            .get(url)
            .then(res => {
                if (res.data.length == 0) {
                    setImg("404.jpeg")
                    setMsg("NO CERTIFICATE FOUND!")
                }
                const student = res.data[0]
                console.log(student)
                if (course in student.courses) {
                    status = student.courses[course]
                } else {
                    status = 0
                }

                if (status !== 0) {
                    setImg(student.certificates[course] + ".jpg")
                    setMsg(`THE ${course.toUpperCase()} CERTIFICATE OF ${student.name.toUpperCase()} IS READY!`)
                } else {
                    setImg("404.jpeg")
                    setMsg("NO CERTIFICATE FOUND!")
                }
                
                setEmail("")
                setCourse("")
            })
    }

    var status;
    const onSubmitForm = (event) => {
        event.preventDefault()
        findCertificate(email, course)
    }
    return (
        <>
            <form className="topsearch" onSubmit={onSubmitForm}>
                <button type="submit">Search</button>
                <input type="text" placeholder="Your student email..." name="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                <input type="text" placeholder="Your course (SQL/Python/PowerBI)" name="course" value={course} onChange={(event) => setCourse(event.target.value)} required/>
            </form>
            <div id="certImg">
                <h1>{msg}</h1>
                <img src={require("../images/certificates/" + img)} alt="Datapot" />
            </div>
            <div id="quote">
                <h1>"{posts}"</h1>
            </div>
            <br></br>
        </>
    );
}

export default Certificates;