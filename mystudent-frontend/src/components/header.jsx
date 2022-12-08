import React, { Component } from 'react';
import { useState, useContext } from "react";
import NavBar from './nav_bar';
import { StudentContext } from './context';

const Header = () => {
    const { authenticated, setAuthenticated } = useContext(StudentContext)
    console.log("Header: ", authenticated)
    return ( 
        <header className='datapotheader'>
        {<NavBar authenticated = {authenticated} setAuthenticated={setAuthenticated}></NavBar>}
        </header>

     );
}
 
export default Header;