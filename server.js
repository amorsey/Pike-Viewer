const express = require('express');
const cors = require("cors");
const fetch = require('node-fetch');
const path = require('path');
const helpers = require('./helperFunctions')
require('dotenv').config();

const clientID = process.env.CLIENT_ID;
const clientSECRET = process.env.CLIENT_SECRET;

let app = express();
let port = process.env.PORT || 6002;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "pike-scheduler/build")))

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

// For serving frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "pike-scheduler/build", "index.html"))
// })

app.get('/week', async (req, res) => {
  // Get Authentication
  const authCode = req.query.AUTH_CODE
  const callbackURL = req.query.CALLBACK_URL
  const authRequest = helpers.generateAuthRequest(
      authCode,
      callbackURL,
      clientID,
      clientSECRET
  )
  const rawData = await fetch(authRequest, {
      method: "POST"
  })
  // Fetch Data
  const data = await rawData.json()
  const TOKEN = data.access_token
  const sessionRequest = helpers.generateSessionsRequest()
  const payload = await fetch(sessionRequest, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${TOKEN}` }
  })
  const payloadData = await payload.json()
  res.send(payloadData)
})
