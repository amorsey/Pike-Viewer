import React from 'react'
import DayColumn from './DayColumn'
import { daysOfTheWeek, hoursOfTheDay } from '.././constants'

const WeekView = ({sessionsByDay}) => {
    return (
        <div className='weekPage'>
            <div className='timesColumn'>
                <div className='titleCell'> </div>
                {hoursOfTheDay.map((time, id) => {
                    return <div className='titleCell' key={id}>{time.toUpperCase()}</div>
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
              return <DayColumn day={day} sessionsByHour={sessionsByHour} key={id}/>
            })}
        </div>
    )
}
export default WeekView
