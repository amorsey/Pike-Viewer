import React from 'react'
import { useSelector } from 'react-redux'
import WeekView from '../component/WeekView'
import Popup from '../components/Popup'


// Right now Popup overrides weekview. We want to to overlay.
// I think we can just have WeekView and Popup on their own line and have ...
// ...
const Scheduler = () => {
    const popupActive = useSelector(state => state.popup.active)

    return (
        <div className='schedulerContainer'>
            <h1>Week View</h1>
            {/* add search bar component here ? */}
            <WeekView />
            {popupActive ? <Popup /> :  }
        </div>
    )
}

export default Scheduler
