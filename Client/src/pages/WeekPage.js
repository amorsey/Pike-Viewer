import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import WeekView from './../components/WeekView'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setAllSessions } from './../redux/allSessionsSlice'
import { parseWeekData, firstUpper } from './../functions'
import { monthsOfTheYear } from '.././constants'
import './WeekPage.css'

const Scheduler = () => {
    let sessionsByDay = useSelector(state => state.allSessions)
    const popupActive = useSelector(state => state.popup.active)
    const dispatch = useDispatch()
    const [searchField, setSearchField] = useState("");
    const [firstOpen, setFirstOpen] = useState(true);
    const [titleText, setTitleText] = useState("");
    const [dayOffset, setDayOffset] = useState(0);

    let filteredSessions = {}
    for (let [k, v] of Object.entries(sessionsByDay)) {

      filteredSessions[k] = v.filter(
        session => {
          if (typeof(session.topic) == "undefined"){
            console.log(session)
          }
          return(session.staff[0].toLowerCase().includes(searchField) ||
                session.topic.toLowerCase().includes(searchField)
        )
        }
      )
    }
    const handleChange = e => {
      setSearchField(e.target.value);
    };
    const handleClickToday = e => {
      setDayOffset(0)
      setFirstOpen(true)
    }
    const handleClickLastWeek = e => {
      setDayOffset(dayOffset-7)
      setFirstOpen(true)
    }
    const handleClickNextWeek = e => {
      setDayOffset(dayOffset+7)
      setFirstOpen(true)
    }
    function getDates(offset){
      let now = new Date();
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let offsetToday = new Date(today.setDate(today.getDate()+offset))
      let lastSunday = new Date(offsetToday.setDate(offsetToday.getDate()-offsetToday.getDay()));
      let nextSaturday = new Date(offsetToday.setDate(offsetToday.getDate()-offsetToday.getDay()+6));
      let startYear = lastSunday.getFullYear()
      let startMonth = (lastSunday.getMonth() + 1).toString().padStart(2, '0');
      let startDay = lastSunday.getDate()
      let endYear = nextSaturday.getFullYear()
      let endMonth = (nextSaturday.getMonth() + 1).toString().padStart(2, '0');
      let endDay = nextSaturday.getDate()
      let startDate = startMonth + "/" + startDay + "/" + startYear
      let endDate = endMonth + "/" + endDay + "/" + endYear
      setTitleText(
        monthsOfTheYear[lastSunday.getMonth()] + " " +
        lastSunday.getDate() + " " +
        today.getFullYear() + " to " +
        monthsOfTheYear[nextSaturday.getMonth()] + " " +
        nextSaturday.getDate() + " " +
        nextSaturday.getFullYear()
      )
      return [startDate, endDate]
    }

    useEffect(() => {
      if (firstOpen){
        let dates = getDates(dayOffset)
        console.log("load that shit")
        setFirstOpen(false)
        let url = window.location
        const callback_url = 'http://localhost:3000/week-view';
        let access_token = new URLSearchParams(url.search).get("code")
        let fetchRequest = (
          "/week?CALLBACK_URL=" + callback_url +
          "&AUTH_CODE=" + access_token +
          "&DATES=" + dates
        )

        async function fetchData(){
            const rawData = await fetch(fetchRequest)
            const data = await rawData.json()
            const weekSchedule = parseWeekData(data.event_occurrences)
            dispatch(setAllSessions(weekSchedule))
          }
          fetchData()
      }

    })

    let today = new Date();


    return (
        <div className='schedulerContainer'>
            <div className='topBar'>
            {titleText}
            </div>
            <div className='optionBar'>
              <div className='dateSelectButtons'>
                <button className="lastWeekButton" onClick={handleClickLastWeek}>Last Week</button>
                <button className="todayButton" onClick={handleClickToday}>Today</button>
                <button className="nextWeekbutton" onClick={handleClickNextWeek}>NextWeek</button>
              </div>
              <input
                className="searchBar"
                type = "search"
                placeholder = "Filter..."
                onChange = {handleChange}
              />
            </div>
            {popupActive ? <Popup /> : <WeekView sessionsByDay={filteredSessions} />}
        </div>
    )
}

export default Scheduler
