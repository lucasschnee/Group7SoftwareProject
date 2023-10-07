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
        <h1 className="app-title"><Link to="/">VandyLifts</Link></h1>
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/trainers">Meet the Trainers</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/discussion">Discussion</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div><em>A fitness club for bringing like-minded people together</em></div>} />
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
