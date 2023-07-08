import { useEffect, useState, useRef } from 'react'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'

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

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(state => {
    return state.users
  })

  const handleLogout = event => {
    event.preventDefault()
    dispatch(userLogout())
  }

  const newBlogRef = useRef()

  return (
    <div>
      <div style={{ background: 'rgba(31,31,31,12%)', display: 'flex', gap: '8px' }}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>Bloglist</h2>
      <Notification success={success} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setSuccess={setSuccess} />
        </Togglable>
      ) : (
        <>
          <Routes>
            <Route path="/blogs/:id" element={<BlogView blogs={[...blogs]} setSuccess={setSuccess}/>} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route
              path="/"
              element={
                <div>
                  <h2>Blogs</h2>
                  <Togglable buttonLabel="new blog" ref={newBlogRef}>
                    <NewBlog
                      blogs={[...blogs]}
                      newBlogRef={newBlogRef}
                      setSuccess={setSuccess}
                    />
                  </Togglable>
                  <Blogs
                    blogs={[...blogs]}
                    setSuccess={setSuccess}
                    user={user}
                  />
                </div>
              }
            />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
