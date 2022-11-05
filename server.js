const express = require('express');

// Choose Production or Dev by changing URL
// const URL = 'https://tcs-scheduler.herokuapp.com';
const URL = 'http://localhost:3000';

const cors = require("cors");
const fetch = require('node-fetch'); //needs to be node-fetch version 2.6.7
const path = require('path');
require('dotenv').config();

const clientID = process.env.CLIENT_ID;
const clientSECRET = process.env.CLIENT_SECRET;
const callbackURL = URL + "/week-view"

const app = express();
const port = process.env.PORT || 6002;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "pike-scheduler/build")))

const startDay = "00:00:00";
const endDay = "23:59:59";
let date = new Date();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let year = date.getFullYear();
lastSunday = date.getDate() - date.getDay();
// calculate range of dates
week = Array.from(new Array(7), (x, i) => i + lastSunday);
firstlast = [week[0], week[week.length - 1]];

app.get('/week', async (req, res) => {

    //parse query string
    const authCode = req.query.AUTH_CODE
    const fetchRequest = `https://pike13.com/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${callbackURL}&client_id=${clientID}&client_secret=${clientSECRET}`
    console.log(authCode)
    console.log(fetchRequest)

    //request the access token from Pike API
    const rawData = await fetch(fetchRequest, {
        method: "POST"
    })
    const data = await rawData.json()
    const TOKEN = data.access_token
    console.log(data)

    //const weekRequest = `https://tcs-sanramon.pike13.com/api/v2/desk/event_occurrences?from=${year}-${month}-${firstlast[0]}T${startDay}Z&to=${year}-${month}-${firstlast[1]}T${endDay}Z`
    const weekRequest = "https://tcs-sanramon.pike13.com/api/v2/desk/event_occurrences?from=2022-11-1T00:00:00Z&to=2022-11-5T23:59:59Z"
    //const weekRequest = `https://tcs-sanramon.pike13.com/api/v2/desk/event_occurrences`
    //request week's data with access token from Pike API
    console.log(weekRequest)
    const payload = await fetch(weekRequest, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${TOKEN}` }
    })
    console.log("TEST2")
    console.log(payload)
    console.log("TEST3")
    const payloadData = await payload.json()

    console.log(payloadData)
    res.send(payloadData)

})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "pike-scheduler/build", "index.html"))
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
