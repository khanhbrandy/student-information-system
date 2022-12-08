import React, { Component } from 'react';
import HomeMain from './home_main';
import HomeModules from './home_modules';
import HomeFooter from './home_footer';

const Home = () => {
    return ( 
        <>
            <HomeMain></HomeMain>
            <HomeModules></HomeModules>
            <HomeFooter></HomeFooter>
        </>
     );
}
 
export default Home;