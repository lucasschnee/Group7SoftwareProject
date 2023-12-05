const express = require('express');
const {
  getUser, test, searchForTrainer, bookSession, getAllTrainers //testSearchForUser //searchForUser
} = require('../controllers/userController');

const router = express.Router();

router.put('/test', test);
//router.post('/search-for-trainer', searchForTrainer);


// router.get('/:uid', getUser);

router.get('/get-all-trainers', getAllTrainers);

router.get('/trainer/:trainerName', searchForTrainer);

//router.get('/users/:userID', searchForUser); //new

//router.get('/hello', testSearchForUser); //new



router.post('/bookings', bookSession);


module.exports = router;


