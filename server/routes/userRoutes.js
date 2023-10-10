const express = require('express');
const {
  getUser, test
} = require('../controllers/userController');

const router = express.Router();

router.put('/test', test);

router.get('/:uid', getUser);


module.exports = router;
