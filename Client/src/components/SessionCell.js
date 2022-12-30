import React, { useState, useRef, useEffect } from 'react'
import { firstUpper } from './../functions'

const SessionCell = ({ session, cells}) => {
  const sessionType = session.event.replace(/Code|Coaching/gi, '')
  let studentInfo = ""
  if (session.students.length > 0){
    studentInfo = <div className="sessionDataTag">
      <div>Students:</div>
      {session.students.map((student, id) => {
        return (<div className="studentTag" key={id}>{student}</div>)
      })}
    </div>
  }

  return (
  <div className="sessionCell">
    <div className="sessionTitleTag">
      <div className="sessionTypeTag">{sessionType}</div>
      <div className="sessionTopicTag"><b>{firstUpper(session.topic)}</b></div>
    </div>
    <div className="sessionDataTag">
    {session.staff.map((staff, id) => {
        return (<div className="CoachTag" key={id}><b>{staff}</b></div>)
      })}
    </div>
    <div className="sessionDataTag">{session.startTime} - {session.endTime}</div>
    {studentInfo}
  </div>)
}
export default SessionCell
