import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Landing = () => {

    const navigate = useNavigate()



    return (
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
            {/* Should redirect to the CreateAccount page */}
            
            {/* <nav>
                <ul>
                    <li><Link to="/create-account">SIGN UP</Link></li>
                
                </ul>
            </nav> */}
            {/* <button class="signup-button" onClick={console.log("BUTTON CLICKED")}>SIGN UP </button>  */}
            
            </div>
            </div>
        </div>
    )
}

export default Landing;