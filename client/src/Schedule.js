import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function Schedule() {
    // Example list of trainers and times for filtering
    const trainers = [
    "Melanie Leguizamon",
    "Henry Jonokuchi",
    "Matthew Stein",
    "Cole Ellis",
    "Sarah Buonnano",
    "Alyssa Bersamin",
    "Bita Tavafoghi"
    ];
    const times = ["8:00am - 9:00am", "9:00am - 10:00am", "10:00am - 11:00am", "11:00am - 12:00pm", "12:00pm - 1:00pm", "1:00pm - 2:00pm","2:00pm - 3:00pm","3:00pm - 4:00pm","4:00pm - 5:00pm", "5:00pm - 6:00pm","6:00pm - 7:00pm", "7:00pm - 8:00pm"];
    const dayOfWeek = ["Monday","Tuesday","Wenesday","Thursday","Friday"];

// State to handle search and filter values
const [searchTerm, setSearchTerm] = useState('');
const [selectedTrainer, setSelectedTrainer] = useState('');
const [selectedTime, setSelectedTime] = useState('');
const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');

const [currentTrainerName, setCurrentTrainerName] = useState("");
const [currentTrainerHomeTown, setCurrentTrainerHomeTown] = useState("");
const [currentTrainerPosition, setCurrentTrainerPosition] = useState("");
const [currentTrainerTimes, setCurrentTrainerTimes] = useState("");

const [days, setDays] = useState([]);
const [time, setTime] = useState([]);
const [bookedTimeSlots, setBookedTimeSlots] = useState(Array(times?.length).fill(''));
const [bookedDays, setBookedDays] = useState(Array(times?.length).fill(''))
const [checks, setChecks] = useState(Array(times?.length).fill(false))

const [trainerData, setTrainerData] = useState("")

useEffect(() => {
  getAllTrainers()
}, [])

const getAllTrainers = async () => {

  console.log("trying to get all trainers")

  fetch("http://localhost:4000/api/user/get-all-trainers", {
  method: "GET",
})
  .then(function(response) {
    // This right here is the response we will receive before we convert
    // it over to readable JSON
    console.log("Response turning to readable JSON", response);
    return response.json();
  })
  .then(function(response) {
    console.log("success")
    setTrainerData(JSON.stringify(response))
    

  })
  .catch(function(error) {
    console.log("failure")
    console.log("Error in async", error);
  });

}


const handleClick = async () => {
    console.log("working");

    fetch("http://localhost:4000/api/user/trainer"+searchTerm, {
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

const handleClick2 = async () => {
  try {
    // Check if a trainer is selected
    if (selectedTrainer) {
      // Use the selectedTrainer value in the API call
      const response = await fetch("http://localhost:4000/api/user/trainer/" + selectedTrainer, {
        method: "GET",
      });

      const data = await response.json();

      setCurrentTrainerName(data.name);
      setCurrentTrainerPosition(data.Position);
      setCurrentTrainerHomeTown(data.Hometown);
      setCurrentTrainerTimes(data.Times);



      // When we fetch the data, we also need to set the length of the selectedDayTime array to 10 falses or however many date time combos you have
      let arr = [];
      for (let i = 0; i < days.length; i++) {
        arr.push(false);
      }

      if (data.Times) {
        setDays(Object.keys(data.Times));
        setTime(Object.values(data.Times));
      }
      
      // When we get data for a trainer, we reset the selected days/times
      setBookedDays(Array(times?.length).fill(''))
      setBookedTimeSlots(Array(times?.length).fill(''))
      
      // When we get data for a trainer, we reset all checkboxes to false
      setChecks(Array(times?.length).fill(false))

      // Add code to the trainer's information in a popup or modal
      // You can use a library like Material-UI Dialog for this purpose
    } else {
      // Handle the case where no trainer is selected
      console.warn("Please select a trainer before clicking submit.");
      
    }

  } catch (error) {
    console.error("Error in async", error);
  }
};


const handleCheckSubmit = async () => {
  try {

    const resp = await fetch("http://localhost:4000/api/user/trainer/" + selectedTrainer, {
        method: "GET",
      });

      const data2 = await resp.json();

      setCurrentTrainerName(data2.name);
      setCurrentTrainerTimes(data2.Times);
      //setTimeSlotBookingStatus(data2.Times);

    // Create an object to send to the server, including the selected time slots.
    const data = {
      trainerName: currentTrainerName, // Replace with the trainer's name.
      timeSlots: bookedTimeSlots,
      arrayOfDays: bookedDays
    };

    // for (const key in data2.Times) {
    //   data.timeSlots.push(key);
    // }
    
    
    // Now, the timeSlots array will contain all time slots, both booked and unbooked
    console.log(data.timeSlots);
    console.log(data.arrayOfDays);

  

    const response = await fetch("http://localhost:4000/api/user/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify(data)
      
    });

    
    
    if (response.ok) {
      handleClick2();
      console.log("Booking successful!");
    } else {
      console.error("Booking failed.");
    }
  } catch (error) {
    console.error("Error in async", error);
  }
};


// Accepts index which will be used to set true on selectedDayTime
// handle change when button pressed accepts an int

function handleCheck(i,days) {
  const updatedBookedTimeSlots = [...bookedTimeSlots];
  updatedBookedTimeSlots[i] = !updatedBookedTimeSlots[i];
  setBookedTimeSlots(updatedBookedTimeSlots);
  
  // Update booleans inside check arr
  let checkArr = checks
  checkArr[i] = !checkArr[i]
  setChecks(checkArr)

  setBookedDays([...bookedDays, days]);
}


function displayTimes() {
  let lines = [];

  // Dont display times until the data is loaded in
  if (days == undefined || currentTrainerTimes == undefined)
  {
    return
  }

  for (let i = 0; i < days?.length; i++) {
    const timeSlot = time[i];
    const isBooked = currentTrainerTimes[days[i]] == 'booked'; // Check if the time slot is booked

    // Dont display times until the data is loaded in
    if (currentTrainerTimes?.length == 0)
    {
      return;
    }

    const dayTime = Object.keys(currentTrainerTimes)[i]

    // Dont display times until the data is loaded in
    if (dayTime == undefined)
    {
      return
    }

    // Define a style object with different styles based on the booking status
    const slotStyle = {
      color: isBooked ? 'red' : 'green', // Red if booked, green if available
      fontWeight: isBooked ? 'bold' : 'normal',
    };

    const checkboxColor = isBooked ? "red" : "green";

    let firstSpaceIndex = 0
    
    // Find where first space is
    for (let i = 0; i < dayTime?.length; i++)
    {
      if (dayTime[i] == " ")
      {
        firstSpaceIndex = i
        break
      }
    }

    let day = dayTime.substring(0, firstSpaceIndex)
    let hours = dayTime.substring(firstSpaceIndex + 1, dayTime?.length)

    // Make sure only selected hours shown
    if (selectedTime != "" && selectedTime != hours)
    {
      continue
    }

    // Make sure only selected hours shown
    if (selectedDayOfWeek != "" && selectedDayOfWeek != day)
    {
      continue
    }

    lines.push(
      <div style={slotStyle}>
        <b>{days[i]}</b>: {timeSlot}
        <Checkbox
        checked={checks[i]}
          onChange={() => handleCheck(i, days[i])}
          inputProps={{ 'aria-label': 'controlled' }}
          color="success"
          style={{ color: 'white' }}
        />
      </div>
    );
  }

  return lines;
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
      <button onClick={handleClick2}>Submit</button>
      
      
      {/* Time filter dropdown */}
      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
        <option value=''>Filter by Time</option>
        {times.map(time => <option key={time} value={time}>{time}</option>)}
      </select>
      <button onClick={handleClick2}>Submit</button>

      {/* Day of Week filter dropdown */}
      <select value={selectedDayOfWeek} onChange={(e) => setSelectedDayOfWeek(e.target.value)}>
        <option value=''>Filter by Day</option>
        {dayOfWeek.map(dayOfWeek => <option key={dayOfWeek} value={dayOfWeek}>{dayOfWeek}</option>)}
      </select>
      <button onClick={handleClick2}>Submit</button>
      
      {/* Placeholder for schedule content */}
      {currentTrainerName != "" && 
        <div style={{ textAlign: 'left'}}>
          <h3>Trainer: {currentTrainerName}</h3>
          <h3>Hometown: {currentTrainerHomeTown}</h3>
          <h3>Position: {currentTrainerPosition}</h3>
          <h3>Availability:</h3> {displayTimes()}
          <button onClick={handleCheckSubmit}>Submit</button>
        </div>
      }
    <div > 
      <h3 className="whiteText">
        Select a trainer and click submit to see their availability. 
      </h3>
    </div>

    </div>
  <Footer />
</div>
);
}
export default Schedule;   