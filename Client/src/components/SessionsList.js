import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'

const SessionsList = ({ sessions }) => {

  return (
  <div className="RowContainer">
    {sessions.map((session, id) => {
      return (
          <SessionCell session={session} cells={sessions.length}/>
      )
    })}
  </div>)
}
export default SessionsList
