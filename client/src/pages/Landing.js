import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Landing = () => {

    const navigate = useNavigate()




    return (
        <div>
            <div>
            <div className="welcome">
            <h2>Welcome</h2></div>
            <div className="welcome-message">
            <p >
            to Vanderbilt's premier lifting mentorship organization
            </p></div>
            <div className="join">
            <p>Join us today.</p>
            <div>
            <button onClick={() => {navigate("/create-account")}} class="signup-button">SIGN UP</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Landing;