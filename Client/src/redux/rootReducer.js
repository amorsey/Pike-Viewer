import { combineReducers } from 'redux'

import allSessions from './allSessionsSlice'
import popup from './popupSlice'

export default combineReducers({
    allSessions,
    popup
})
