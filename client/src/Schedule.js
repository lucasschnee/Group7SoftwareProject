import React, { useState } from 'react';

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

    return (
        <div>
            <h2>Schedule</h2>
            
            {/* Search bar */}
            <input 
                type="text" 
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
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
    );
}

export default Schedule;
