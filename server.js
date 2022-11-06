const express = require('express');
const cors = require("cors");
const fetch = require('node-fetch'); //needs to be node-fetch version 2.6.7
const path = require('path');
const helpers = require('./helperFunctions')
require('dotenv').config();

const clientID = process.env.CLIENT_ID;
const clientSECRET = process.env.CLIENT_SECRET;

const app = express();
const port = process.env.PORT || 6002;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "pike-scheduler/build")))

const URL = 'http://localhost:3000';
const callbackURL = URL + "/week-view"

app.get('/week', async (req, res) => {

  const authCode = req.query.AUTH_CODE
  const fetchRequest = `https://pike13.com/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${callbackURL}&client_id=${clientID}&client_secret=${clientSECRET}`

  const rawData = await fetch(fetchRequest, {
      method: "POST"
  })
  const data = await rawData.json()
  const TOKEN = data.access_token
  const weekRequest = helpers.getWeeklySessionsRequest()

  const payload = await fetch(weekRequest, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${TOKEN}` }
  })
  const payloadData = await payload.json()

  res.send(payloadData)
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "pike-scheduler/build", "index.html"))
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})



// if (process.env.NODE_ENV === 'development') {
//   // ...
// }
//
// if (process.env.NODE_ENV === 'production') {
//   // ...
// }
