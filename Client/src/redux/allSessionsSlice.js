import { createSlice } from '@reduxjs/toolkit'

export const allSessionsSlice = createSlice({
    name: 'allSessions',
    initialState: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    reducers: {
      setAllSessions: (state, action) => {
        state.monday = action.payload.monday
        state.tuesday = action.payload.tuesday
        state.wednesday = action.payload.wednesday
        state.thursday = action.payload.thursday
        state.friday = action.payload.friday
        state.saturday = action.payload.saturday
        state.sunday = action.payload.sunday
      },
    },
  })

// Action creators are generated for each case reducer function
export const { setAllSessions } = allSessionsSlice.actions

export default allSessionsSlice.reducer
