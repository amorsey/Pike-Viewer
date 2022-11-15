import React, { useState } from 'react'
import SessionCell from './SessionCell'

const HourCell = ({ hour, sessions, handleClick }) => {

  if (sessions.length > 3){
    let display = `${sessions.length} classes starting at ${hour}`
    return <div className="activeCell" onClick={handleClick} data={sessions}>{display}</div>
  } else if (sessions.length > 0){
    return (
      <div className="activeCell" onClick={handleClick}>
      {sessions.map((session, id) => {
        return <SessionCell session={session} cells={sessions.length} key={id} />
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
