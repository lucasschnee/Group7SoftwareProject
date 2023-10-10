import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from './About';
import Trainers from './Trainers';
import Schedule from './Schedule';
import Discussion from './Discussion';
import './App.css';
import Footer from './Footer';
import firebase from './firebase';

function App() {
  
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const ref = firebase.firestore().collection("trainers");
  

  function getTrainers() {
    setLoading(true);
    ref.onSnapshot ((querySnapshot) => {
      const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        }); 
        setTrainers(items);
        setLoading(false);
    });
  }

  useEffect(() => {
    getTrainers();
  }, []);

  //console.log(ref);
  
  if (loading){
    return <h1>Loading...</h1>
  }
  
  
  return (
    <div>
    <div>
      <h1>Trainers</h1>
      {trainers.map((trainer) => ( 
        <div key={trainer.title}>
          <h2>nknk</h2> 
        </div>
      ))}
      </div>

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
    </div>
  );
}

export default App;
