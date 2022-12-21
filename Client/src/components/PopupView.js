import React, { useState } from 'react'
import SessionCell from './SessionCell'
import SessionsList from './SessionsList'

const PopupView = ({ sessions }) => {
  return (
  <div className="fullCellPopup">
    <SessionsList sessions={sessions} />
  </div>)
}
export default PopupView
