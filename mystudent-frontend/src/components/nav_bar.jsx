import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useContext } from "react";
import { StudentContext } from './context';

const NavBar = ({authenticated, setAuthenticated}) => {
    const location = useLocation();
    const handleLogout = () => {
        setAuthenticated(false)
        localStorage.setItem("authenticated", false);
        alert("Logged out successfully!");
    }
    if (!authenticated) {
        return (
            <nav className="tabs">
                <Link id="navicon" to="#"><img src={require("../images/navicon.png")} alt="" /></Link>
                <ul className="mainmenu">
                    <li><Link to="/login" id={location.pathname == "/login" ? "currentPage" : "login"}>LOGIN</Link></li>
                    <li><Link to="/certificates" id={location.pathname == "/certificates" ? "currentPage" : "certificates"} >CERTIFICATES</Link></li>
                    <li><Link to="/" id={location.pathname == "/" ? "currentPage" : "home"}>HOME</Link></li>

                </ul>
            </nav>
        );
    } else {
        return (
            <nav className="tabs">
                <Link id="navicon" to="#"><img src={require("../images/navicon.png")} alt="" /></Link>
                <ul className="mainmenu">
                    <li><Link onClick={handleLogout} to="/login" id={location.pathname == "/login" ? "currentPage" : "login"}>LOGOUT</Link></li>
                    <li><Link to="/certificates" id={location.pathname == "/certificates" ? "currentPage" : "certificates"} >CERTIFICATES</Link></li>
                    <li><Link to="/" id={location.pathname == "/" ? "currentPage" : "home"}>HOME</Link></li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;