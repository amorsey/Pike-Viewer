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

  // Getting student topic by ID from notes.
  // Checks for saved topic data locally and if it doesn't exist or a week...
  // old it quries notes for each student and determines the most used topic...
  // over the past 5 sessions.
  let fileData = null
  let daysSinceLastUpdate = 0
  try {
    fileData = fs.readFileSync('studentData.json')
  } catch (error){
    console.log("No file")
  }
  if (fileData){
    let data = JSON.parse(fileData);
    daysSinceLastUpdate = compareDates(data["updateDate"])
  }
  if (daysSinceLastUpdate >= 7 || fileData == null){
    let studentIDs = payloadData["event_occurrences"].map(session => {
      return session["people"].map(student => {
        return student["id"]
      })
    }).flat()
    let uniqueStudentIDs = [...new Set(studentIDs)];
    let studentInfo = {}
    for (const id of uniqueStudentIDs){
      let notePayload = await fetch(helpers.generateNotesRequest(id), {
          method: 'GET',
          headers: { "Authorization": `Bearer ${TOKEN}` }
      })
      let notePayloadData = await notePayload.json()
      let languague = helpers.determineLanguague(notePayloadData["notes"])
      studentInfo[id] = languague
    }
    fs.writeFileSync("studentData.json", JSON.stringify({
      updateDate : new Date(),
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

function compareDates(oldDate){
  let today = new Date()
  let lastDate = new Date(oldDate)
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((today - lastDate) / oneDay));
}
