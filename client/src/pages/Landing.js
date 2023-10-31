import { useNavigate } from "react-router-dom";

const Landing = () => {

    navigate = useNavigate()

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
            <button class="signup-button" onClick={navigate("/create-account")}>SIGN UP </button> 
            
            </div>
            </div>
        </div>
    )
}

export default Landing;