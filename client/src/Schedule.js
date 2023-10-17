import React, { useState } from 'react';
import Footer from './Footer';

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
          // Don't worry if this says "false", it just returns that when the user already exists from flasks end
          // Once it reaches here, the async is already successful
          console.log("Successful async: ", JSON.stringify(response));
          console.log("realdata",response);
          console.log(response.Hometown);
          console.log(response.Position);
          console.log(response.Name);

         
            let li = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            let name = document.createTextNode(JSON.stringify(response.name));
            let hometown = document.createTextNode(JSON.stringify(response.Hometown));
            let position = document.createTextNode(JSON.stringify(response.Position));

            li.appendChild(name);
            li2.appendChild(hometown);
            li3.appendChild(position);

            // Append LI to UL
            document.querySelector("#TrainerName").appendChild(li);
            document.querySelector("#TrainerHometown").appendChild(li2);
            document.querySelector("#TrainerPosition").appendChild(li3);
            


        })
        .catch(function(error) {
          console.log("Error in async", error);
        });

        // first get potential friend's UID
        // let response = await fetch('http://localhost:4000/api/user/trainer/'+searchTerm, {
        //     method: 'GET'
        // })
        
        // if (!response.ok) {
        //     console.log("no trainer with name")
        //     return;
        // } else {
        //     data = await response.json();
        //     console.log("found trainer");
        //     console.log(data);
        // }
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
    
    
    {/* Time filter dropdown */}
    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
    <option value=''>Filter by Time</option>
    {times.map(time => <option key={time} value={time}>{time}</option>)}
    </select>
    
    
    {/* Placeholder for schedule content */}
    <p>*Insert schedule feature here*</p>
    </div>
    <Footer />
    </div>
    );
    }
    
    
    export default Schedule;
    