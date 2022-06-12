
const express = require('express');
const {addUser, loginUser, stateUser, unloginUser} = require('../controllers/userController-background');

const router = express.Router();

router.post('/addUser' , addUser);
router.post('/login', loginUser)
router.get('/estatusUser',stateUser);
router.post('/logout',unloginUser);

module.exports = router;