import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'

const HourCell = ({ hour, sessions }) => {
  const [showPopup, setPopup] = React.useState(false);
  let handleClick = event => setPopup(true)

  if (sessions.length > 3){
    let display = `${sessions.length} classes starting at ${hour}`
    return (
      <div onClick={handleClick}>
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <div className="activeCell" data={sessions}>{display}</div>
      </div>
    )
  } else if (sessions.length > 0){
    return (
      <div onClick={handleClick} className="activeCell">
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <SessionsList sessions={sessions}/>
      </div>
    )
  }else{
    return <div className="emptyCell"></div>
  }

  return(
    <div
      onClick={handleClick}
      className={isActiveStyle}
      data={sessions}>{display}</div>
  )
}
export default HourCell
