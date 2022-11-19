import React, { useState } from 'react'
import SessionCell from './SessionCell'

const PopupView = ({ sessions }) => {
  return (
  <div className="Popup">
    {sessions.map((session, id) => {
      return (
        <div key={id}>
          <SessionCell session={session} cells={sessions.length}/>
        </div>
      )
    })}
  </div>)
}
export default PopupView
