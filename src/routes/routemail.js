
const express = require('express');
const {emailSend} = require('../controllers/mailController');

const router = express.Router();

router.post('/mail' , emailSend);

module.exports = router;