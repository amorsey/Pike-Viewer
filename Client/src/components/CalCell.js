import React, { useState, useRef } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'
import { useEffect } from "react"

const CalCell = ({ sessions , cellType}) => {
    const [showPopup, setPopup] = React.useState(false);
    let handleClick = event => {
      console.log("TEST")
      setPopup(true)
    }

    let handleUnclick = function(){
      setPopup(false)
    }

    if (sessions.length > 4 || (sessions.length > 2 && cellType=="height-short")){
        let display = `${sessions.length} Classes`
        return (
            <div onClick={handleClick} className={"fullCell " + cellType}>
                { showPopup ? <PopupView handleUnclick={handleUnclick} sessions={sessions} type="Full"/> : null }
                <div data={sessions}>{display}</div>
            </div>
        )
    } else if (sessions.length > 1 ) {
        return (
            <div onClick={handleClick} className={"weekCell " + cellType}>
                { showPopup ? <PopupView handleUnclick={handleUnclick} sessions={sessions} type="Short"/> : null }
                <SessionsList sessions={sessions}/>
            </div>
        )
    } else {
      return (
          <div className={"weekCell " + cellType}>
              <SessionsList sessions={sessions}/>
          </div>
      )
    }
}
export default CalCell
