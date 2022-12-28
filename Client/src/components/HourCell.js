import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'

const HourCell = ({nextTopEmpty, hour, sessions }) => {
  const [showPopup, setPopup] = React.useState(false);
  let handleClick = event => setPopup(true)

  if (sessions.length > 4){
    let display = `${sessions.length} Classes`
    return (
      <div onClick={handleClick} className="fullCell" >
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <div data={sessions}>{display}</div>
      </div>
    )
  } else if (sessions.length == 1 && nextTopEmpty){
    return (
      <div className="weekCellLong">
        {parseMinutes(sessions[0].startTime) > 0 ? <div className="nextTopEmpty"></div> : null}
        <div onClick={handleClick} >
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <SessionsList sessions={sessions}/>
        </div>
      </div>
    )
  } else if (sessions.length == 1){
    return (
      <div className="weekCell">
        {parseMinutes(sessions[0].startTime) > 0 ? <div className="emptyTop"></div> : null}
        <div onClick={handleClick} >
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <SessionsList sessions={sessions}/>
        </div>
      </div>
    )
  } else if (sessions.length > 0){
    return (
      <div onClick={handleClick} className="weekCell">
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <SessionsList sessions={sessions}/>
      </div>
    )
  } else{
    return <div className="emptyCell"></div>
  }
}
export default HourCell


function parseMinutes(time){
  return time.split(":")[1].substring(0, 2)
}
