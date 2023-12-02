import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './CreateAccount.css'
import { updateProfile } from "firebase/auth";


const CreateAccount = () => {


    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [createdSuccessfully, setCreatedSuccessfully] = React.useState(false)
    const [createFailed, setCreateFailed] = React.useState(false)

    const navigate = useNavigate()

    const auth = getAuth();
    
    function CreateWithFirebase()
    {
        // When you call createUserWithEmailAndPassword, pass in email and password states above

       // console.log("Email:", email); // Debug statement to log email value
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            // Signed up 
            const user = userCredential.user;
            // ...
       
            if (email.endsWith("@vanderbilt.edu")) {
                // user.sendEmailVerification()
                //     .then(() => {
                //         console.log("Verification email sent.");
                //         // Display a message informing the user to check their email for verification.
                //     })
                //     .catch((error) => {
                //         console.error("Error sending verification email: ", error);
                //     }); //the email stuff is getting messed up
                setCreatedSuccessfully(true);
                
                setTimeout(() => {
                    
                    updateProfile(auth.currentUser, {
                        displayName: name
                      })

                    navigate("/about");
                }, 1000); // Delay for 1 second (1000 milliseconds)
                //now make it say log out on the nav bar
            } else {
                console.log("Please use a Vanderbilt email.");
                setCreateFailed(true);

            }
            
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setCreateFailed(true)
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
                    onChange={(event) => { {/* only vandebrilt */}
                        setEmail(event.target.value);
                    }}
                />

                <TextField
                    sx={{
                        backgroundColor:'white'
                    }}
                    id="outlined-controlled"
                    label="Name"
                    value={name}
                    onChange={(event) => { {/* only vandebrilt */}
                        setName(event.target.value);
                    }}
                />
                {/* only vandebrilt */}

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
                    Created Account Successfully!
                </h3>
            }
            {createFailed && !email.endsWith("vanderbilt.edu") && 
            <h3>
                Please use a Vanderbilt email
            </h3>
            }
            {createFailed && email.endsWith("vanderbilt.edu") && 
                <h3>
                    Failed to create account
                </h3>
            }
        </div>
    )
}

export default CreateAccount;