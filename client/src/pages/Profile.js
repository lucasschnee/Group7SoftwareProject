import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {auth} from "../App"
import {useAuthState} from "react-firebase-hooks/auth"
const firebase = require("firebase/database");


const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
   
    return (
        <div className="profile-page">


            <div className="profile-background">
                <div className="profile-data">
                    <h2>Profile Data</h2>

                    <p className="profile-data-entry">ID: {user?.uid}</p>
                    <p className="profile-data-entry">Email: {user?.email}</p>

                </div>
            </div>
        </div>
    )


}

export default Profile;