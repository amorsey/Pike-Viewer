import React, { useState, useEffect } from 'react'
import HourCell from './HourCell'
import { useDispatch } from 'react-redux'
import { setPopupInfo, setPopupState } from '../redux/popupSlice'
import { hoursOfTheDay } from '.././constants'

const DayColumn = ({ day, sessionsByHour }) => {
  const dispatch = useDispatch()
  const handleClick = (event) => {
    console.log("click")
  }

  return (
    <div className='dayColumn'>
      <h3>{day}</h3>
      {hoursOfTheDay.map((hour, id) => {
        return <HourCell sessions={sessionsByHour[hour]} hour={hour} key={id}/>
      })}
    </div>
  )
}
export default DayColumn
