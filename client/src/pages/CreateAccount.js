import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './CreateAccount.css'

const CreateAccount = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [createdSuccessfully, setCreatedSuccessfully] = React.useState(false)
    const [createFailed, setCreateFailed] = React.useState(false)

    const navigate = useNavigate()

    const auth = getAuth();

    function CreateWithFirebase()
    {
        // When you call createUserWithEmailAndPassword, pass in email and password states above


        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            // redirect to about page using navigate

            setCreatedSuccessfully(true)

            // Add code to wait a second!

            // redirect to landing page using navigate
            navigate("/about")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setCreateFailed(false)
            // ..
        });

    }
        

    
    


    return (
        <div className="text-field-container">
            

            <TextField
                    sx={{
                        backgroundColor:'white'
                    }}
                    id="outlined-controlled"
                    label="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

            {/* { Text Field for email */}

            <TextField
                    sx={{
                        backgroundColor:'white'
                    }}
                    className="text-box"
                    id="password-text"
                    label="Password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                
            <Button
                    sx={{
                        backgroundColor:'white'
                    }}
                onClick={() => {
                    CreateWithFirebase();
                }}
                >
                Create Account
            </Button>

            {createdSuccessfully && 
                <h3>
                    Created Account SuccessfullY!
                </h3>
            }
            {createFailed && 
                <h3>
                    Failed to create account
                </h3>
            }
        </div>
    )
}

export default CreateAccount;