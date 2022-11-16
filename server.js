const express = require('express');
const cors = require("cors");
const fetch = require('node-fetch');
const path = require('path');
const helpers = require('./helperFunctions')
const fs = require('fs');
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
  let sessionRequest = helpers.generateSessionsRequest()
  let payload = await fetch(sessionRequest, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${TOKEN}` }
  })
  let payloadData = await payload.json()

  // Grab student topics
  let updateFile = true
  let fileExists = false
  try {
    fs.readFileSync('studentData.json')
    fileExists = true
  } catch {
    fileExists = false
  }
  if (fileExists){
    let rawdata = fs.readFileSync('studentData.json');
    let data = JSON.parse(rawdata);
    let firstDate = new Date()
    let secondDate = new Date(data["updateDate"])
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    if (diffDays <= 7){
      updateFile = false
    }
  }
  if (updateFile){
    // Pull student topics
    let students = payloadData["event_occurrences"].map(session => {
      return session["people"].map(student => {
        return student["id"]
      })
    }).flat()
    let uniqueStudents = [...new Set(students)];
    let studentInfo = {}
    for (const studentID of uniqueStudents){
      let noteRequest = helpers.generateNotesRequest(studentID)
      let notePayload = await fetch(noteRequest, {
          method: 'GET',
          headers: { "Authorization": `Bearer ${TOKEN}` }
      })
      let notePayloadData = await notePayload.json()
      let languague = helpers.determineLanguague(notePayloadData["notes"])
      studentInfo[studentID] = languague
      console.log(languague)
    }
    let now = new Date();
    fs.writeFileSync("studentData.json", JSON.stringify({
      updateDate : now,
      students : studentInfo
    }))
  }
  // let students = payloadData["event_occurrences"].map(session => {
  //   return session["people"].map(student => {
  //     return student["id"]
  //   })
  // })
  // console.log(students)
  res.send(payloadData)
})
