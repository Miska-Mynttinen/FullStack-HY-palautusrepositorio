import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setSuccess(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = blogObject => {
    newBlogRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setSuccess(true)
        setMessage(`Added ${blogObject.title}`)
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setSuccess(false)
        setMessage(`Failed to add ${blogObject.title}} to server`)
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
        setBlogs(blogs.filter(person => person.id !== blogObject.id))
      })
  }

  const addLike = b => {
    const copy = blogs.find(blog => blog.title === b.title)
    const addedLike = b.likes + 1
    const changedBlog = { ...copy, likes: addedLike }

    blogService
      .update(changedBlog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(blog => (blog.id !== changedBlog.id ? blog : returnedBlog))
        )

        setSuccess(true)
        setMessage(`Updated ${b.title} likes`)
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setSuccess(false)
        setMessage(`Failed to add like to ${b.title}`)
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
        setBlogs(blogs.filter(person => person.id !== changedBlog.id))
      })
  }

  const removeBlog = blogToDelete => {
    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      blogService
        .remove(blogToDelete.id)
        .then(
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id)),

          setSuccess(true),
          setMessage(`removed ${blogToDelete.title}`),
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
        )
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          setSuccess(false)
          setMessage(
            `The number ${blogToDelete.title} was already deleted from server`
          )
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        })
    }
  }

  const newBlogRef = useRef()

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={message} success={success} />
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
            <NewBlog createBlog={addBlog} />
          </Togglable>
          <Blogs
            blogs={blogs}
            addLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        </>
      )}
    </div>
  )
}

export default App
