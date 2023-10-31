import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Header = () => {

    const [message, setMessage] = useState("");
    useEffect(() => {
      fetch("http://localhost:4000/api/user/id") // by default fetch will use get
        .then((res) => res.json())
        .then((data) => setMessage(data));
    }, []);
  
  
    const [trainerName, setName] = useState("");
    useEffect(() => {
      fetch("http://localhost:4000/api/user/users")
        .then((res) => res.json())
        .then((data) => setName(data));
    }, []);

    return (    
    <div className="app-container">
        <h1>{message}</h1> 
        <h1>{trainerName}</h1> 
        <div id= "TrainerName"></div>
        <div id= "TrainerHometown"></div>
        <div id= "TrainerPosition"></div>
        <h1 className="app-title"><Link to="/">VANDYLIFTS</Link></h1>
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/trainers">Meet the Trainers</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/discussion">Discussion</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create-account">Create Account</Link></li>
        
          </ul>
        </nav>
    </div>
    )
}

export default Header;