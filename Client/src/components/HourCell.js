import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'
import CalCell from './CalCell'

const HourCell = ({aboveHalfCell, belowLongCell, hour, sessions }) => {
  const [showPopup, setPopup] = React.useState(false);

  let sessionOnHour = false
  let sessionNotOnHour = false
  for (let i=0; i < sessions.length; i++){
    if (parseMinutes(sessions[i].startTime) > 0){
      sessionNotOnHour = true;
    } else {
      sessionOnHour = true;
    }
  }
  let bothTypes = sessionOnHour && sessionNotOnHour
  let cellType = "height-normal"
  if (sessions.length > 1 && aboveHalfCell && bothTypes){
    cellType = "height-long"
  } else if (!aboveHalfCell && !sessionOnHour){
    cellType = "height-short"
  }

  if (sessions.length > 0  && !belowLongCell && !sessionOnHour && sessionNotOnHour){
      let name = aboveHalfCell ? "weekCellLong" :  "weekCell"
      return(
        <div className={name}>
          <div className="emptyCell height-short"></div>
          <CalCell sessions={sessions} cellType={cellType} />
        </div>)
  } else if (sessions.length > 0)  {
      return (<CalCell sessions={sessions} cellType={cellType} />)
  } else {
    let cell_height = belowLongCell ? "height-short" :  "height-normal"
    return <div className={"emptyCell " + cell_height}></div>
  }
}
export default HourCell

function parseMinutes(time){
  return time.split(":")[1].substring(0, 2)
}
