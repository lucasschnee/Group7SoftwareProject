const express = require('express')
const {
  sendFriendRequest,
  answerFriendRequest,
  sendSessionInvite,
  answerSessionInvite,
} = require('../controllers/notificationController')

const router = express.Router()

// POST a friend request
router.post('/send-friend-request', sendFriendRequest)

// POST answer to friend request
router.post('/answer-friend-request', answerFriendRequest)

// POST send a session invite
router.post('/send-session-invite', sendSessionInvite)

// POST answer to session invite
router.post('/answer-session-invite', answerSessionInvite)

module.exports = router;