const Notification = ({ message, success }) => {
  let messageStyle = ''

  if (message === null) {
    return null
  }

  if (!success) {
    messageStyle = 'error'
  }

  if (success) {
    messageStyle = 'success'
  }

  return <div className={messageStyle}>{message}</div>
}

export default Notification
