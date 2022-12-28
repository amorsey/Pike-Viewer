import React from 'react'
import { useSelector } from 'react-redux'
import WeekView from './../components/WeekView'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setAllSessions } from './../redux/allSessionsSlice'
import { parseWeekData } from './../functions'
import './WeekPage.css'

const Scheduler = () => {
    const popupActive = useSelector(state => state.popup.active)
    const dispatch = useDispatch()

    useEffect(() => {
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
    })

    return (
        <div className='schedulerContainer'>
            <div>
              <input></input>
            </div>
            {popupActive ? <Popup /> : <WeekView />}
        </div>
    )
}

export default Scheduler
