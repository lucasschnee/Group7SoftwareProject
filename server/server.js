const firebase = require("firebase/app");
const express = require('express');

const userRoutes = require('./routes/userRoutes')

const PORT = 4000

const firebaseConfig = {
    apiKey: "AIzaSyCc7X1IWwzV-n2eIDcSe605brdRWAHYQrQ",
    authDomain: "swe-project-304dd.firebaseapp.com",
    databaseURL: "https://swe-project-304dd-default-rtdb.firebaseio.com",
    projectId: "swe-project-304dd",
    storageBucket: "swe-project-304dd.appspot.com",
    messagingSenderId: "414472923061",
    appId: "1:414472923061:web:f9cc87465d661fee24dbfc",
    measurementId: "G-7TWZD35N23"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create express app
const app = express()

// checks if request has body data (e.g. post, patch)
// if it does, passes that data to req object
app.use(express.json())

// will run every time a request comes in, simply logs for debug
app.use((req, res, next) => {
  console.log('connected to path:', req.path, 'with method:', req.method)
  next()
})

// if we get a request from that page
app.use('/api/user', userRoutes);

const server = app.listen(PORT, () => {
    console.log(`dhsjhdjServer is running on http://localhost:${PORT}`);
});