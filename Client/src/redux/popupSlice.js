import { createSlice } from '@reduxjs/toolkit'

export const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        active: false,
        info: []
    },
    reducers: {
        setPopupState: (state, action) => {
            state.active = action.payload
        },
        setPopupInfo: (state, action) => {
            console.log("setPopupInfo")
            console.log(action.payload)
            state.info = action.payload
        }
    },
  })

// Action creators are generated for each case reducer function
export const { setPopupState, setPopupInfo } = popupSlice.actions
export default popupSlice.reducer
