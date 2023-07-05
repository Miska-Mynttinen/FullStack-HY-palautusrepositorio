import { useSelector } from 'react-redux'

const Notification = ({ success }) => {
  const notification = useSelector(state => state.notification)
  let messageStyle = ''

  if (notification === '') {
    return null
  }

  if (!success) {
    messageStyle = 'error'
  }

  if (success) {
    messageStyle = 'success'
  }

  return <div className={messageStyle}>{notification}</div>
}

export default Notification
