import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificatioDispatch = (notification) => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const addNotification = (notification) => {
  return {
    type: 'NOTIFICATION',
    payload: notification
  }
}

export default NotificationContext