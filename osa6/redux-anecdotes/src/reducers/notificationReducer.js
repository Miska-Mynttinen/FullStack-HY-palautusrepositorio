import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const setNotificationNew = (content, seconds) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => { 
      dispatch(setNotification(''))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer