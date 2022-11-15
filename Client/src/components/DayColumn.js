import React, { useState, useEffect } from 'react'
import HourCell from './HourCell'
import { useDispatch } from 'react-redux'
import { setPopupInfo, setPopupState } from '../redux/popupSlice'
import { hoursOfTheDay } from '.././constants'

const DayColumn = ({ day, data }) => {
  const dispatch = useDispatch()
  const handleClick = (data) => {
    console.log("click")
    if(data.length > 0){
      dispatch(setPopupInfo(data))
      dispatch(setPopupState(true))
    }
  }

  return (
    <div className='RowContainer'>
      <h3>{day}</h3>
      {hoursOfTheDay.map((time, id) => {
        let sessions = data[time]
        return (
          <HourCell
            data={data[time]}
            time={time}
            key={id}
            handleClick={() => handleClick(data[time])} />)
      })}
    </div>
  )
}
export default DayColumn
