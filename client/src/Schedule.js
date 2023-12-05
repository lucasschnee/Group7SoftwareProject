import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import Footer from './Footer';
import Checkbox from '@mui/material/Checkbox';

function Schedule() {
    const auth = getAuth();
    const [user] = useAuthState(auth);

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
    const [bookedTimeSlots, setBookedTimeSlots] = useState(Array(12).fill(''));
    const [bookedDays, setBookedDays] = useState(Array(12).fill(''));
    const [checks, setChecks] = useState(Array(12).fill(false));
    const [trainerData, setTrainerData] = useState("");
    const trainers = [
        "Melanie Leguizamon",
        "Henry Jonokuchi",
        "Matthew Stein",
        "Cole Ellis",
        "Sarah Buonnano",
        "Alyssa Bersamin",
        "Bita Tavafoghi"
    ];
    const times = ["8:00am - 9:00am", "9:00am - 10:00am", "10:00am - 11:00am", "11:00am - 12:00pm", "12:00pm - 1:00pm", "1:00pm - 2:00pm", "2:00pm - 3:00pm", "3:00pm - 4:00pm", "4:00pm - 5:00pm", "5:00pm - 6:00pm", "6:00pm - 7:00pm", "7:00pm - 8:00pm"];
    const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    useEffect(() => {
        if (user) {
            getAllTrainers();
        }
    }, [user]);

    const getAllTrainers = async () => {
        fetch("http://localhost:4000/api/user/get-all-trainers", {
            method: "GET",
        })
        .then(response => response.json())
        .then(response => {
            setTrainerData(JSON.stringify(response))
        })
        .catch(error => {
            console.log("Error in async", error);
        });
    }

    const handleClick = async () => {
        fetch("http://localhost:4000/api/user/trainer"+searchTerm, {
            method: "GET",
        })
        .then(response => response.json())
        .then(response => {
            setCurrentTrainerName(response.name);
            setCurrentTrainerPosition(response.Position);
            setCurrentTrainerHomeTown(response.Hometown);
            setCurrentTrainerTimes(response.Times);
            if (response.Times) {
                setDays(Object.keys(response.Times));
                setTime(Object.values(response.Times));
            }
        })
        .catch(error => {
            console.log("Error in async", error);
        });
    }

    const handleClick2 = async () => {
        if (selectedTrainer) {
            const response = await fetch("http://localhost:4000/api/user/trainer/" + selectedTrainer, {
                method: "GET",
            });
            const data = await response.json();
            setCurrentTrainerName(data.name);
            setCurrentTrainerPosition(data.Position);
            setCurrentTrainerHomeTown(data.Hometown);
            setCurrentTrainerTimes(data.Times);
            if (data.Times) {
                setDays(Object.keys(data.Times));
                setTime(Object.values(data.Times));
            }
            setBookedDays(Array(12).fill(''));
            setBookedTimeSlots(Array(12).fill(''));
            setChecks(Array(12).fill(false));
        } else {
            console.warn("Please select a trainer before clicking submit.");
        }
    };

    const handleCheckSubmit = async () => {
        const resp = await fetch("http://localhost:4000/api/user/trainer/" + selectedTrainer, {
            method: "GET",
        });
        const data2 = await resp.json();
        setCurrentTrainerName(data2.name);
        setCurrentTrainerTimes(data2.Times);
        console.log(user.uid);
        const data = {
            trainerName: currentTrainerName,
            timeSlots: bookedTimeSlots,
            arrayOfDays: bookedDays,
            userID:user.uid,
            userEmail:user.email
        };
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
    };

    const handleCheck = (i, days) => {
        const updatedBookedTimeSlots = [...bookedTimeSlots];
        updatedBookedTimeSlots[i] = !updatedBookedTimeSlots[i];
        setBookedTimeSlots(updatedBookedTimeSlots);
        let checkArr = checks;
        checkArr[i] = !checkArr[i];
        setChecks(checkArr);
        setBookedDays([...bookedDays, days]);
    };

    const displayTimes = () => {
        let lines = [];
        if (days === undefined || currentTrainerTimes === undefined) {
            return;
        }
        for (let i = 0; i < days?.length; i++) {
            const timeSlot = time[i];
            const isBooked = currentTrainerTimes[days[i]] != 'open';
            if (currentTrainerTimes?.length === 0) {
                return;
            }
            const dayTime = Object.keys(currentTrainerTimes)[i];
            if (dayTime === undefined) {
                return;
            }
            const slotStyle = {
                color: isBooked ? 'red' : 'green',
                fontWeight: isBooked ? 'bold' : 'normal',
            };
            let firstSpaceIndex = dayTime.indexOf(" ");
            let day = dayTime.substring(0, firstSpaceIndex);
            let hours = dayTime.substring(firstSpaceIndex + 1);
            if (selectedTime !== "" && selectedTime !== hours) {
                continue;
            }
            if (selectedDayOfWeek !== "" && selectedDayOfWeek !== day) {
                continue;
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
    };

    if (!user) {
        return (
            <div className="not-logged-in">
                <h2>Please log in to view and book schedules.</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="schedule">
                <h2>Schedule a Session</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleClick}>Submit</button>
                <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                    <option value=''>Filter by Trainer</option>
                    {trainers.map(trainer => <option key={trainer} value={trainer}>{trainer}</option>)}
                </select>
                <button onClick={handleClick2}>Submit</button>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value=''>Filter by Time</option>
                    {times.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
                <button onClick={handleClick2}>Submit</button>
                <select value={selectedDayOfWeek} onChange={(e) => setSelectedDayOfWeek(e.target.value)}>
                    <option value=''>Filter by Day</option>
                    {dayOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <button onClick={handleClick2}>Submit</button>
                {currentTrainerName !== "" && 
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
