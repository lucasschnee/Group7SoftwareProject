const express = require('express');
const {
  register, getUser, getUsersName, updateInstruments, updateGenres, getUIDWithEmail
} = require('../controllers/userController');

const router = express.Router();

// POST the user's name
router.post('/register', register);

// GET the user's information
router.get('/:uid', getUser);

// GET the user's full name
router.get('/:uid/name', getUsersName);

// PATCH the instruments
router.put('/update-instruments', updateInstruments);

// PATCH the genres
router.put('/update-genres', updateGenres);

// Get a user ID given an email
router.post('/get-uid-with-email', getUIDWithEmail)

module.exports = router;
