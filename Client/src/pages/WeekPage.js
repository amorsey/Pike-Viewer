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

    let filteredSessions = {}
    for (let [k, v] of Object.entries(sessionsByDay)) {
      filteredSessions[k] = v.filter(
        session => {
          return(session.staff[0].toLowerCase().includes(searchField) ||
                session.topic.toLowerCase().includes(searchField)
        )
        }
      )
    }
    const handleChange = e => {
      setSearchField(e.target.value);
    };

    useEffect(() => {
      if (firstOpen){
        console.log("load that shit")
        setFirstOpen(false)
        let url = window.location
        const callback_url = 'http://localhost:3000/week-view';
        let access_token = new URLSearchParams(url.search).get("code")
        let fetchRequest = `/week?CALLBACK_URL=${callback_url}&AUTH_CODE=${access_token}`

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
            {"January"}
            </div>
            <div className='optionBar'>
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
