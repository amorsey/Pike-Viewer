import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'
import CalCell from './CalCell'

const HourCell = ({aboveHalfCell, belowLongCell, hour, sessions }) => {
  const [showPopup, setPopup] = React.useState(false);
  let handleClick = event => {
    console.log("Click")
    setPopup(true)
  }

  if (sessions.length > 0){
    let sessionOnHour = false
    let sessionNotOnHour = false
    for (let i=0; i< sessions.length; i++){
      if (parseMinutes(sessions[i].startTime) > 0){
        sessionNotOnHour = true;
      } else {
        sessionOnHour = true;
      }
    }
    if (!belowLongCell && !sessionOnHour && sessionNotOnHour){
      let name = aboveHalfCell && !belowLongCell && sessionNotOnHour? "weekCellLong" :  "weekCell"
      let innerName =  aboveHalfCell || sessionOnHour ? "" : "Short"
      return(
        <div onClick={handleClick} className={name}>
          <div className="emptyCellShort"></div>
          <CalCell sessions={sessions} cellType={innerName} />
        </div>)
    } else {
      let name = ""
      let bothTypes = sessionOnHour && sessionNotOnHour

      if (sessions.length > 1 && aboveHalfCell && bothTypes){
        name = "Long"
      } else if ( !aboveHalfCell && !sessionOnHour){
        name = "Short"
      }
      return (<CalCell sessions={sessions} cellType={name} />)
    }
  } else if (sessions.length > 0){
    return (<CalCell sessions={sessions} cellType={""} />)
  } else {
    let name = belowLongCell ? "emptyCellShort" :  "emptyCell"
    return <div className={name}></div>
  }
}
export default HourCell

function parseMinutes(time){
  return time.split(":")[1].substring(0, 2)
}
