import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
const userAtStart = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
loggedUserJSON ? blogService.setToken(userAtStart.token) : null

const loginSlice = createSlice({
  name: 'user',
  initialState: userAtStart,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const userLogin = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password,
    })

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }
}

export default loginSlice.reducer
