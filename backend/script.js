const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const icsToJson = require('ics-to-json').icsToJson;

const app = express();

app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ohrcal.firebaseio.com"
});

const db = admin.firestore();

app.post('/icsToJSON', (req, res) => {
  console.log(req.body);
  res.send(icsToJSON(req.body.text));
})

app.listen(5000, () => console.log('hello'));