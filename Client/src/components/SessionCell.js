import React, { useState } from 'react'
import { firstUpper } from './../functions'

const SessionCell = ({ session, cells}) => {
  const sessionType = session.event.replace(/Code|Coaching/gi, '')
  let studentInfo = ""
  if (session.students.length > 0){
    studentInfo = <div className="sessionDataTag">
      <div>Students:</div>
      {session.students.map((student, id) => {
        return (<div className="studentTag" key={id}>{" " + student + " "}</div>)
      })}
    </div>
  }


  return (
  <div className="sessionCell">
    <div className="sessionTitleTag">
      <div className="sessionTypeTag">{sessionType}</div>
      <div className="sessionTopicTag">{firstUpper(session.topic)}</div>
    </div>
    <div className="sessionDataTag">{session.staff}</div>
    <div className="sessionDataTag">Time: {session.startTime}</div>
    {studentInfo}
  </div>)
}
export default SessionCell
