import React, { useState, useEffect } from 'react'
import Session from './Session'
import { useDispatch } from 'react-redux'
import { setPopupInfo, setPopupState } from '../redux/popupSlice'

const Day = ({ day, data }) => {
  const  timeData = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]
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
      {timeData.map((time) => {
        let sessions = data[time]
        return <Session data={data[time]} time={time} key = {time.id} handleClick={() => handleClick(data[time])} />
      })}
    </div>
  )
}

export default Day
