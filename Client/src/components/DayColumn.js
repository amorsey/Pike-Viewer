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
      {hoursOfTheDay.map((hour, id) => {
        return <HourCell sessions={sessionsByHour[hour]} hour={hour} key={id}/>
      })}
    </div>
  )
}
export default DayColumn
