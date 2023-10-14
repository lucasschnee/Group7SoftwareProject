import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from './About';
import Trainers from './Trainers';
import Schedule from './Schedule';
import Discussion from './Discussion';
import './App.css';
import Footer from './Footer';

function App() {
  return (
  <Router>
  <div className="app-container">
  <h1 className="app-title"><Link to="/">VANDYLIFTS</Link></h1>
  <nav>
  <ul>
  <li><Link to="/about">About</Link></li>
  <li><Link to="/trainers">Meet the Trainers</Link></li>
  <li><Link to="/schedule">Schedule</Link></li>
  <li><Link to="/discussion">Discussion</Link></li>
  </ul>
  </nav>
  
  
  <Routes>
  <Route path="/" element={
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
  <button class="signup-button">SIGN UP</button>
  </div>
  </div>
  </div>}
  />
  <Route path="/about" element={<About />} />
  <Route path="/trainers" element={<Trainers />} />
  <Route path="/schedule" element={<Schedule />} />
  <Route path="/discussion" element={<Discussion />} />
  </Routes>
  </div>
  </Router>
  );
  }
  
  
  export default App;
  