const express = require('express');

//Production Run
const URL = 'https://tcs-scheduler.herokuapp.com';

//Dev Run
//const URL = 'http://localhost:6002/';

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

    //request the access token from Pike API
    const rawData = await fetch(`https://pike13.com/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${callbackURL}&client_id=${clientID}&client_secret=${clientSECRET}`, {
        method: "POST"
    })
    const data = await rawData.json()
    const TOKEN = data.access_token

    //request week's data with access token from Pike API
    const payload = await fetch(`https://tcs-sanramon.pike13.com/api/v2/desk/event_occurrences?from=${year}-${month}-${firstlast[0]}T${startDay}Z&to=${year}-${month}-${firstlast[1]}T${endDay}Z`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${TOKEN}` }
        })
    const payloadData = await payload.json()

    res.send(payloadData)

})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "pike-scheduler/build", "index.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
