import React from 'react'
import DayColumn from './DayColumn'
import { useSelector } from 'react-redux'
import { daysOfTheWeek, hoursOfTheDay } from '.././constants'

const WeekView = () => {
    let sessionsByDay = useSelector(state => state.allSessions)
    return (
        <div className='weekContainer'>
            <div className='hourColumn'>
                {hoursOfTheDay.map((time, id) => {
                    return <div className='timeCell' key={id}>{time}</div>
                })}
            </div>

            {daysOfTheWeek.map((day, id) => {
              // Create dictionary with all sessions at each whole hour
              let sessionsByHour = hoursOfTheDay.reduce((map, day) => (map[day]=[], map), {});
              sessionsByDay[day].map((session) => {
                let hour =  session.nearHour == 12 ? 12 : session.nearHour % 12
                let ampm = session.nearHour >= 12 ? 'pm' : 'am';
                sessionsByHour[hour + ampm].push(session)
              })
              return <DayColumn day={day} data={sessionsByHour} key={id}/>
            })}
        </div>
    )
}
export default WeekView
