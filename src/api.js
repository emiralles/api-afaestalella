const express = require("express");
const adminfire = require("firebase-admin");
let cors = require('cors')
const bodyParser = require('body-parser');
const serviceAccount = require("../src/firebase/serviceAccountKey.json");


adminfire.initializeApp({
  credential: adminfire.credential.cert(serviceAccount),
  serviceAccountId: "firebase-adminsdk-w46nv@afa-estalella-i-graells.iam.gserviceaccount.com"
});


const routerprincipal = require("./routes/routeprincipal");
const routersecond = require("./routes/routesecond");
const routermail = require("./routes/routemail");
const routeruser = require("./routes/routeuser");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api', routerprincipal);
app.use('/api', routersecond);
app.use('/api', routermail);
app.use('/api', routeruser);


module.exports = app;

