import React, { useState, useEffect } from 'react'
import HourCell from './HourCell'
import { useDispatch } from 'react-redux'
import { setPopupInfo, setPopupState } from '../redux/popupSlice'
import { hoursOfTheDay } from '.././constants'
import { firstUpper } from './../functions'

const DayColumn = ({ day, sessionsByHour }) => {
  const dispatch = useDispatch()
  return (
    <div className='dayColumn'>
      <div className='titleCell'>{firstUpper(day)}</div>
      {hoursOfTheDay.map((hour, id, elements) => {
        let aboveHalfCell = false
        if (id+1 < elements.length && sessionsByHour[elements[id+1]].length==0){
          aboveHalfCell = true
        } else if (id+1 < elements.length){
          aboveHalfCell = parseMinutes(sessionsByHour[elements[id+1]][0].startTime) > 0
          let nextHour = sessionsByHour[elements[id+1]]
          for (let i=0; i<nextHour.length; i++){
            if (parseMinutes(nextHour[i].startTime) == 0){
              aboveHalfCell = false
              break
            }
          }
        }
        let belowLongCell = false
        if (id-1 >= 0){
            let previousHour = sessionsByHour[elements[id-1]]
            for (let i=0; i<previousHour.length; i++){
              if (parseMinutes(previousHour[i].startTime) > 0){
                belowLongCell = true
                break
              }
            }
        }
        return <HourCell sessions={sessionsByHour[hour]} aboveHalfCell={aboveHalfCell} belowLongCell={belowLongCell} hour={hour} key={id}/>
      })}
    </div>
  )
}
export default DayColumn


function parseMinutes(time){
  return time.split(":")[1].substring(0, 2)
}
