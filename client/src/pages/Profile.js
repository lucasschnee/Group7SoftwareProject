import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './Profile.css'

import {auth} from "../App"
import {useAuthState} from "react-firebase-hooks/auth"

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    
    // Create a backend function which is GET
    // When you call it, send the uID
    // the function will send back email, name, username, anything you need

    return (
        <div className="profile-page">

            
            <div className="profile-background">
                <div className="profile-data">
                    <h2>Profile Data</h2>

                    <p className="profile-data-entry">Name: {user?.displayName}</p>
                    <p className="profile-data-entry">Email: {user?.email}</p>
                    
                </div>
                <div className="booked-sessions">
                    <h2>Your Sessions</h2>

                    <p className="session">Monday 2:00 - 3:00 pm with Henry Jonokuchi</p>
                    <p className="session">Monday 2:00 - 3:00 pm with Henry Jonokuchi</p>
                    <p className="session">Monday 2:00 - 3:00 pm with Henry Jonokuchi</p>
                
                </div>
            </div>


        </div>



    )
}

export default Profile;