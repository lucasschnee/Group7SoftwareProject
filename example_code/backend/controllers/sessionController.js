const firebase = require("firebase/database");
const functions = require("firebase-functions")

const createSession = async (req, res) => {
  const {creator, creator_email, title, descr, address, city, state, postal, date, time, privacy, instruments} = req.body

  let emptyFields = []
  
  // ensure all fields are filled out in form
  if (!title) {
    emptyFields.push('Title')
  }
  if (!descr) {
    emptyFields.push('Description')
  }
  if (!address) {
    emptyFields.push('Address')
  }
  if (!city) {
    emptyFields.push('City')
  }
  if (!state) {
    emptyFields.push('State')
  }
  if (!postal) {
    emptyFields.push('Postal Code')
  }
  if (!time) {
    emptyFields.push('Time')
  }
  if (!privacy) {
    emptyFields.push('Who Can Join')
  }
  if (emptyFields.length > 0) {
    console.log("Couldn't post, needed fields: ", emptyFields)
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // make sure user is logged in
  if (!creator)
  {
    console.log("Couldn't post, user logged out!")
    return res.status(400).json({ error: 'Please log in again'})
  }

  // add to the database
  try {    
    const db = firebase.getDatabase();
    
    // push method generates unique ID for each session
    await firebase.push(firebase.ref(db, 'sessions/'), {
      creator: creator,
      creator_email: creator_email,
      title: title,
      descr: descr,
      address: address,
      city: city,
      state: state,
      postal: postal,
      time: time,
      privacy: privacy,
      instruments: instruments
    });

    res.status(200);

  } catch (error) {
    res.status(400).json({ error: error.message })
      console.log('Couldn\'t make new session, error:' + error.message)
  }
}

workouts = [{
  creator: "James Kiernan",
  title: "Tuesday Session",
  descr: "Meeting with some friends!",
  address: "3 Pilgrim Lake Terrace",
  date: "09/21/2009",
  privacy: "Public"
}, {
  creator: "Myles Robinson",
  title: "Session",
  descr: "Hey guys",
  address: "5 Winter Avenue",
  date: "11/05/2021",
  privacy: "Public"
}]

const getAllSessions = async (req, res) => {
  const db = firebase.getDatabase();

  // just showing this info manually for now
  res.status(200).json(workouts)
};

// get a session
const getSession = async (req, res) => {
  const {id} = req.params.session_id

  Session = null

  for (let i = 0; i < workouts.length; i++){
    let obj = workouts[i]
    if (obj.creator == req.params.session_id) {
      return res.status(200).json(obj)
    }
  }

  if(Session == null){
    return res.status(404).json({error: 'No such workout'})
  }
};

// Add a user to the attendee list
const addAttendee = async (req, res) => {
  
}

module.exports = {
  createSession,
  getAllSessions,
  getSession
};