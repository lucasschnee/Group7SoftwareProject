import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './CreateAccount.css'
import { signInWithEmailAndPassword } from "firebase/auth"

//import { setTimeout } from "timers/promises";

const Login = () => {

    const auth = getAuth();

    const [email, getEmail] = React.useState("")
    const [user, setUser] = React.useState("")
    const [password, getPassword] = React.useState("")
    const [loginSucc, setLoginSuccessfully] = React.useState(false)
    const [loginFailed, setLoginFailed] = React.useState(false)
    
    const navigate = useNavigate()

    const LoginWithFirebase = async () => {
        //setTimeout(function () {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const usr = userCredential.user;
            setUser(usr)
            setLoginSuccessfully(true)

            //await setTimeout(5000);
        //}, 5000);
            navigate("/about")
            

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginFailed(true)
        });



    }



    return (
        <div className="text-field-container">

            {/* { Text Field to get email */}
           <TextField
                    sx={{
                        backgroundColor:'white'
                    }}
                    id="outlined-controlled"
                    label="Email"
                    value={email}
                    onChange={(event) => {
                        getEmail(event.target.value);
                    }}
                />

            <TextField
                    sx={{
                        backgroundColor:'white'
                    }}
                    className="text-box"
                    id="password-text"
                    label="Password"
                    value={password}
                    onChange={(event) => {
                        getPassword(event.target.value);
                    }}
                />

            <Button
                    sx={{
                        backgroundColor:'white'
                    }}
                onClick={() => {
                    LoginWithFirebase();
                }}
                >
                Login
            </Button>
            {loginSucc && 
                <h3>
                    Logging in
                </h3>
            }
            {loginFailed && 
                <h3>
                    Could not login. Try again.
                </h3>
            }

        </div>
    )
}

export default Login;

