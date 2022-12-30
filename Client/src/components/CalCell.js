import React, { useState, useRef } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'
import { useEffect } from "react"

const CalCell = ({ sessions , cellType}) => {
    const [showPopup, setPopup] = React.useState(false);
    let handleClick = event => {
      console.log("Click")
      setPopup(true)
    }

    let handleUnclick = function(){
      setPopup(false)
    }

    if (sessions.length > 4 || (sessions.length > 2 && cellType=="Short")){
        let display = `${sessions.length} Classes`
        return (
            <div onClick={handleClick} className={"fullCell"+cellType}>
                { showPopup ? <PopupView handleUnclick={handleUnclick} sessions={sessions}/> : null }
                <div data={sessions}>{display}</div>
            </div>
        )
    } else {
        return (
            <div onClick={handleClick} className={"weekCell"+cellType}>
                { showPopup ? <PopupView handleUnclick={handleUnclick} sessions={sessions}/> : null }
                <SessionsList sessions={sessions}/>
            </div>
        )
    }
}
export default CalCell
