import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationNew } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [success, setSuccess] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setSuccess(false)
      dispatch(setNotificationNew('wrong username or password', 5))
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const newBlogRef = useRef()

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification success={success} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            password={password}
            username={username}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </Togglable>
      ) : (
        <>
          <p>{user.name} logged in</p>{' '}
          <button onClick={handleLogout}>logout</button>
          <h2>Blogs</h2>
          <Togglable buttonLabel="new blog" ref={newBlogRef}>
            <NewBlog
              blogs={[...blogs]}
              newBlogRef={newBlogRef}
              setSuccess={setSuccess}
            />
          </Togglable>
          <Blogs blogs={[...blogs]} setSuccess={setSuccess} user={user} />
        </>
      )}
    </div>
  )
}

export default App
