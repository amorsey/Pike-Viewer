import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'

const SessionsList = ({ sessions }) => {

  return (
  <div className="sessionsList">
    {sessions.map((session, id) => {
      return (
          <SessionCell session={session} cells={sessions.length} key={id}/>
      )
    })}
  </div>)
}
export default SessionsList
