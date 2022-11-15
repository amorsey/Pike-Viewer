import React, { useState } from 'react'

const SessionCell = ({ session, cells}) => {
  const sessionType = session.event.replace(/Code|Coaching/gi, '')

  if (cells == 1){
    return (<div className="sessionCell" data={session}>
      <div className="infoCell">{sessionType}</div>
      <div className="infoCell">{session.staff}</div>
    </div>)
  } else if (cells == 2){
    return (<div className="sessionCell" data={session}>
      <div className="infoCell">{sessionType}</div>
      <div className="infoCell">{session.staff}</div>
    </div>)
  } else {
    return (<div className="sessionCell" data={session}>{
      `${sessionType}`
    }</div>)
  }
}
export default SessionCell
