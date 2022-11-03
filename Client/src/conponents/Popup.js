import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setPopupState } from '../redux/popupSlice'

const Popup = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.popup.info)

  const handleClose = () => {
    dispatch(setPopupState(false))
  }

  return (
    <div className='popupContainer'>
      {data && data.map((sessionInfo) => {
        return (
          <div>
            <div onClick={handleClose}>x</div>
            <div>
              <h3>Session</h3>
              <p>Event: {sessionInfo.event}</p>
              <p>Time start: {sessionInfo.startTime}</p>
              <p>Time end: {sessionInfo.endTime}</p>
              {sessionInfo.staff.map((coach) => {
                return <p>Coach: {coach}</p>
              })}
              {sessionInfo.students.map((student) => {
                return <p>Student: {student}</p>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Popup
