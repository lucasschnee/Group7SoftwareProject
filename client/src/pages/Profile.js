import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {auth} from "../App"
import {useAuthState} from "react-firebase-hooks/auth"

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    
    // Create a backend function which is GET
    // When you call it, send the uID
    // the function will send back email, name, username, anything you need

    return (
        <div>
            TEST
            {user?.uid}
        </div>
    )
}

export default Profile;