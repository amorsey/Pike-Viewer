import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'

const HourCell = ({ hour, sessions }) => {
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
