import { useEffect } from "react"
import Scheduler from "./pages/WeekPage";
import { useDispatch } from 'react-redux'
import { setAllSessions } from './redux/allSessionsSlice'
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";

function App() {

  const dispatch = useDispatch()

  function parseSessionData(rawSessionData){
    var sessionInfo =  {
      startTime: "",
      endTime: "",
      weekDay: null,
      nearHour: null,
      staff: [],
      event: "",
      students: [],
    }

    let startTimeObject = new Date(rawSessionData.start_at)
    let endTimeObject = new Date(rawSessionData.end_at)

    sessionInfo.startTime = startTimeObject.toLocaleTimeString()
    sessionInfo.endTime = endTimeObject.toLocaleTimeString()
    sessionInfo.weekDay = startTimeObject.getDay()
    sessionInfo.nearHour = startTimeObject.getHours()
    sessionInfo.event = rawSessionData.name

    let staffArray = rawSessionData.staff_members
    for(let staff = 0; staff < staffArray.length; staff++){
      sessionInfo.staff.push(staffArray[staff].name)
    }

    let studentArray = rawSessionData.people
    for(let student = 0; student < studentArray.length; student++){
      sessionInfo.students.push(studentArray[student].name)
    }

    return sessionInfo
  }

  function parseWeekData(rawWeekData){
    const weekSchedule = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }

    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


    for(let event = 0; event < rawWeekData.length; event++){
      let rawSession = rawWeekData[event]
      let session = parseSessionData(rawSession)
      let day = weekDays[session.weekDay]
      weekSchedule[day].push(session)
    }

    return weekSchedule
  }

  // useEffect(() => {
  //   let url = window.location
  //   console.log(url)
  //   let access_token = new URLSearchParams(url.search).get("code")
  //
  //   async function fetchData(){
  //     const rawData = await fetch(`http://localhost:6002/week?AUTH_CODE=${access_token}`)
  //     const data = await rawData.json()
  //     const arrayOfSessions = data.event_occurrences
  //     const weekSchedule = parseWeekData(arrayOfSessions)
  //     dispatch(setAllSessions(weekSchedule))
  //   }
  //
  //   fetchData()
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/week-view" element={<Scheduler />} />
    </Routes>
  );
}

export default App;
