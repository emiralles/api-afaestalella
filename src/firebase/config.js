
const app  = require('firebase/app');

const config = require('../../config');

const firebaseObject = app.initializeApp(config.firebaseConfig)

module.exports = {firebaseObject}

