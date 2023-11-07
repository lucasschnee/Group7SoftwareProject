const express = require('express');
const {
  getUser, test, searchForTrainer, bookSession
} = require('../controllers/userController');

const router = express.Router();

router.put('/test', test);
//router.post('/search-for-trainer', searchForTrainer);

router.get('/:uid', getUser);
router.get('/trainer/:trainerName', searchForTrainer);

router.post('/bookings', bookSession);


module.exports = router;
