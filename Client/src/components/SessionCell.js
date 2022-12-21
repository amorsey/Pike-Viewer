import React, { useState } from 'react'

const SessionCell = ({ session, cells}) => {
  const sessionType = session.event.replace(/Code|Coaching/gi, '')
  return (
  <div className="sessionCell" data={session}>
    <div className="sessionTypeTag">{sessionType}</div>
    <div className="sessionCoachTag">{session.staff}</div>
    <div className="infoCell">{session.topic}</div>
    <div className="infoCell">{session.startTime}</div>
  </div>)
}
export default SessionCell
