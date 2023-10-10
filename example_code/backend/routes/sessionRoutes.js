const express = require('express')
const {
  getSession,
  getAllSessions,
  createSession
} = require('../controllers/sessionController')

const router = express.Router()

// GET all listings
router.get('/', getAllSessions)
// GET one session
router.get('/:session_id', getSession)
// POST one session
router.post('/create', createSession)
// POST a user to attendees
router.post('/join')

module.exports = router;