import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './css/base_styles.css';
import './css/header_styles.css';
import './css/index_styles.css';
import './css/navicon_styles.css';
import './css/login_styles.css';
import './css/admin_styles.css';
import './css/detail_styles.css';
import './css/certificates_styles.css';
import Header from './components/header';
import Home from './components/home';
import Certificates from './components/certificates';
import Login from './components/login';
import NotFound from './components/notfound';
import Admin from './components/admin';
import Detail from './components/detail';
import { useState, useEffect } from "react";
import { StudentContext } from './components/context';
import axios from 'axios';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    // getting stored value
    const loggedInUser = localStorage.getItem("authenticated");
    return loggedInUser || false;
  });
  const value = { authenticated, setAuthenticated };

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  return (
    <div className="App" >
      <StudentContext.Provider value={ value }>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={<Home></Home>}
        >
        </Route>
        <Route
          path="/certificates"
          element={<Certificates></Certificates>}
        >
        </Route>
        <Route
          path="/login"
          element={<Login></Login>}
        >
        </Route>
        <Route
          path="/admin"
          element={
            <Admin></Admin>}
        >
        </Route>
        <Route
          path="/detail/:id"
          element={<Detail></Detail>}
        ></Route>
        <Route
          path="*"
          element={<NotFound></NotFound>}
        >
        </Route>
      </Routes>
      </StudentContext.Provider>
    </div>
  );
}

export default App;
