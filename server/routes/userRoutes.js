const express = require('express');
const {
  getUser, test, searchForTrainer
} = require('../controllers/userController');

const router = express.Router();

router.put('/test', test);
//router.post('/search-for-trainer', searchForTrainer);

router.get('/:uid', getUser);
router.get('/trainer/:trainerName', searchForTrainer);


module.exports = router;
