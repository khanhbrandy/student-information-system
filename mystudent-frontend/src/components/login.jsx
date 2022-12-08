import React, { Component } from 'react';
import { useState, useContext } from "react";
import { StudentContext } from './context';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const { authenticated, setAuthenticated } = useContext(StudentContext)
    console.log("Login: ", authenticated)
    
    const [uname, setUname] = useState("");
    const [psw, setPwd] = useState("");

    const onLogin = (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/finduser/admin`;
        axios
            .get(url)
            .then(res => {
                const admin = res.data[0]
                if (uname == admin.uname && psw == admin.pwd) {
                    setAuthenticated(true)
                    localStorage.setItem("authenticated", true);
                navigate("/admin");
                } else {
                    alert("Username/Password is invalid!!");
                }
            })
    }
    return (
        <form className='loginForm' onSubmit={onLogin}>
            <div className="imgcontainer">
                <img src={require("../images/logo_big.png")} alt="Avatar" className="avatar"></img>
            </div>
            <div className="container">
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" onChange={(event) => setUname(event.target.value)} required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" onChange={(event) => setPwd(event.target.value)} required />

                <button className='loginSubmit' type="submit" >Login</button>
                <label>
                    <input type="checkbox" defaultChecked={true} name="remember" /> Remember me

                </label>
            </div>
        </form>

    );
}

export default Login;
