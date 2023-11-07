import React, { useState } from 'react';
import Footer from './Footer';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//import BigCalendar from 'react-big-calendar'
//import "react-big-calendar/lib/css/react-big-calendar.css";

//moment.locale("en-GB");
//BigCalendar.momentLocalizer(moment);




function Schedule() {
    // Example list of trainers and times for filtering
    const trainers = [
    "Melanie Leguizamon",
    "Henry Jonokuchi",
    "Matthew Stein II",
    "Cole Ellis",
    "Sarah Buonnano",
    "Alyssa Bersamin",
    "Bita Tavafoghi"
    ];
    const times = ["8-9am", "9-10am", "10-11am", "11-12pm"];
    
// State to handle search and filter values
const [searchTerm, setSearchTerm] = useState('');
const [selectedTrainer, setSelectedTrainer] = useState('');
const [selectedTime, setSelectedTime] = useState('');

const [currentTrainerName, setCurrentTrainerName] = useState("");
const [currentTrainerHomeTown, setCurrentTrainerHomeTown] = useState("");
const [currentTrainerPosition, setCurrentTrainerPosition] = useState("");
const [currentTrainerTimes, setCurrentTrainerTimes] = useState("");

const [days, setDays] = useState([]);
const [time, setTime] = useState([]);
// const [checkboxes, setCheckboxes] = useState([]);
const [selectedDayTime, setSelectedDayTime] = useState([]); // Array of bools, where true means they selected that day/time
const [checked, setChecked] = useState(false);


const handleClick = async () => {
    console.log("working");

    fetch("http://localhost:4000/api/user/trainer/"+searchTerm, {
    method: "GET",
  })
    .then(function(response) {
      // This right here is the response we will receive before we convert
      // it over to readable JSON
      console.log("Response turning to readable JSON", response);
      return response.json();
    })
    .then(function(response) {
      console.log(JSON.stringify(response.name))
      setCurrentTrainerName(response.name)
      setCurrentTrainerPosition(response.Position)
      setCurrentTrainerHomeTown(response.Hometown)
      setCurrentTrainerTimes(response.Times)

      // When we fetch the data, we also need to set the length of the selectedDayTime array to 10 falses or however many date time combos you have
      let arr = []
      for (let i = 0; i < days.length; i++) {
        arr.push(false)
      }
      setSelectedDayTime(arr)

      if (response.Times)
      {
        setDays(Object.keys(response.Times))
        setTime(Object.values(response.Times))
      }

    })
    .catch(function(error) {
      console.log("Error in async", error);
    });

}

// Have a function which is caleld when the submit button is pressed
// This will take the boolean array, it will go through each day/time combo
// If the position in the boolean array is true, then you know that time was selected
// You can pass it to the backend in a http post
// And then mark it as taken/remove it

function handleCheckSubmit(boolArray) // this int is the index of the checkbox
{
  for (let i = 0; i < boolArray.length; i++) {
    if(i){
      console.log(`hello`);
      // THIS IS WHERE I WANT TO REMOVE SOMETHING FROM THE DATABASE

    }
  }
}

// Accepts index which will be used to set true on selectedDayTime
// handle change when button pressed accepts an int
// 

function handleCheck(i) // this int is the index of the checkbox
{
  // let arr = selectedDayTime
  // arr[i] = true;
  // setSelectedDayTime(arr)
  const updatedSelectedDayTime = [...selectedDayTime];
  updatedSelectedDayTime[i] = true;
  setSelectedDayTime(updatedSelectedDayTime);

}

function displayTimes() {
  let lines = []

  for (let i = 0; i < days.length; i++){
    lines.push(
      <div>
        <b>{days[i]}</b> : {time[i]}
        <Checkbox
          // checked={checked}
          onChange={() => handleCheck(i)}
          inputProps={{ 'aria-label': 'controlled' }}
          color="success"
          style={{ color: 'white' }}
        />

      </div>
    )
  }

  return lines
}


 
return (
  <div>
    <div className = "schedule">
      <h2>Schedule a Session</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
      

      {/* Trainer filter dropdown */}
      <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
        <option value=''>Filter by Trainer</option>
        {trainers.map(trainer => <option key={trainer} value={trainer}>{trainer}</option>)}
      </select>
      <button onClick={handleClick}>Submit</button>
      
      
      {/* Time filter dropdown */}
      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
        <option value=''>Filter by Time</option>
        {times.map(time => <option key={time} value={time}>{time}</option>)}
      </select>
      
      
      {/* Placeholder for schedule content */}
      <p>*Insert schedule feature here*</p>
      {currentTrainerName != "" && 
        <div style={{ textAlign: 'left' }}>
          <h3>Trainer: {currentTrainerName}</h3>
          <h3>Hometown: {currentTrainerHomeTown}</h3>
          <h3>Position: {currentTrainerPosition}</h3>
          <h3>Times:</h3> {displayTimes()}
          <button onClick={handleCheckSubmit(selectedDayTime)}>Submit</button>
        </div>
      }
      <h2>Test</h2>

    </div>
  <Footer />
</div>
);
}


export default Schedule;   