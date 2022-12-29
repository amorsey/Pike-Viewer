import React, { useState } from 'react'
import SessionCell from './SessionCell'
import PopupView from './PopupView'
import SessionsList from './SessionsList'
import { firstUpper } from './../functions'

const CalCell = ({ sessions , cellType}) => {
    const [showPopup, setPopup] = React.useState(false);
    let handleClick = event => setPopup(true)

    if (sessions.length > 4 || (sessions.length > 2 && cellType=="Short")){
        let display = `${sessions.length} Classes`
        return (
            <div onClick={handleClick} className={"fullCell"+cellType}>
                { showPopup ? <PopupView sessions={sessions}/> : null }
                <div data={sessions}>{display}</div>
            </div>
        )
    } else {
        return (
            <div onClick={handleClick} className={"weekCell"+cellType}>
                { showPopup ? <PopupView sessions={sessions}/> : null }
                <SessionsList sessions={sessions}/>
            </div>
        )
    }
}
export default CalCell