import React, { useState, useEffect } from 'react'
import HourCell from './HourCell'
import { useDispatch } from 'react-redux'
import { setPopupInfo, setPopupState } from '../redux/popupSlice'
import { hoursOfTheDay } from '.././constants'
import { firstUpper } from './../functions'

const DayColumn = ({ day, sessionsByHour }) => {
  const dispatch = useDispatch()
  const handleClick = (event) => {
    console.log("click")
  }

  return (
    <div className='dayColumn'>
      <div className='titleCell'>{firstUpper(day)}</div>
      {hoursOfTheDay.map((hour, id, elements) => {
        let nextTopEmpty = false
        if (id+1 < elements.length && sessionsByHour[elements[id+1]].length==0){
          nextTopEmpty = true
        } else if (id+1 < elements.length){
          nextTopEmpty = parseMinutes(sessionsByHour[elements[id+1]][0].startTime) > 0
        }
        let aboveOverflow = false
        if (id-1 >= 0 && sessionsByHour[elements[id+1]].length==0){
          nextTopEmpty = true
        } else if (id+1 < elements.length){
          nextTopEmpty = parseMinutes(sessionsByHour[elements[id+1]][0].startTime) > 0
        }
        return <HourCell sessions={sessionsByHour[hour]} nextTopEmpty={nextTopEmpty} hour={hour} key={id}/>
      })}
    </div>
  )
}
export default DayColumn


function parseMinutes(time){
  return time.split(":")[1].substring(0, 2)
}
