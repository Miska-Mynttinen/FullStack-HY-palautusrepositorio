import { useEffect, useState, useRef } from 'react'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout } from './reducers/loginReducer'

const App = () => {
  const [success, setSuccess] = useState(null)

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => {
    return state.blogs
  })

  const handleLogout = event => {
    event.preventDefault()
    dispatch(userLogout())
  }

  const newBlogRef = useRef()

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification success={success} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setSuccess={setSuccess} />
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
