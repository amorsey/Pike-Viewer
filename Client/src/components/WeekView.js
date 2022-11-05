import React from 'react'
import Day from './Day'
import { useSelector } from 'react-redux'
const weekData = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const timeData = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", ]

const mapData = (daySchedule) => {
    const mapTimeToSessions = {
        "9am": [],
        "10am": [],
        "11am": [],
        "12pm": [],
        "1pm": [],
        "2pm": [],
        "3pm": [],
        "4pm": [],
        "5pm": [],
        "6pm": [],
        "7pm": [],
        "8pm": []
    }

    for(let i = 0; i < daySchedule.length; i++){
        const sessionData = daySchedule[i]
        let startTime = sessionData.nearHour
        if(startTime != 12){
            startTime = startTime % 12
        }

        if(startTime <= 11 && startTime >= 9){
            mapTimeToSessions[startTime + "am"].push(sessionData)
        }else{
            mapTimeToSessions[startTime + "pm"].push(sessionData)
        }
    }

    return mapTimeToSessions
}

const WeekView = () => {
    const weekSchedule = useSelector(state => state.allSessions)

    return (
        <div className='weekContainer'>
            {/* Time Column  */}
            <div className='timeColumnContainer'>
                <h3>Times</h3>
                {timeData.map((time) => {
                    return <div className='slotContainerUnactive'>{time}</div>
                })}
            </div>

            {/* Days Column */}
            {weekData.map((day) => {
                const daySchedule = weekSchedule[day]
                const data = mapData(daySchedule)
                return <Day day={day} data={data} />
            })}
        </div>
    )
}

export default WeekView
