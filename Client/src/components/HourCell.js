import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'

const HourCell = ({ hour, sessions }) => {
  const [showPopup, setPopup] = React.useState(false);
  let handleClick = event => setPopup(true)

  if (sessions.length > 3){
    let display = `${sessions.length} classes starting at ${hour}`
    return (
      <div>
        { showPopup ? <PopupView sessions={sessions}/> : null }
        <div className="activeCell" onClick={handleClick} data={sessions}>{display}</div>
      </div>
    )
  } else if (sessions.length > 0){
    return (
      <div className="activeCell" onClick={handleClick}>
      {sessions.map((session, id) => {
        return (
          <div key={id}>
            { showPopup ? <PopupView sessions={sessions}/> : null }
            <SessionCell session={session} cells={sessions.length}/>
          </div>
        )
      })}
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
