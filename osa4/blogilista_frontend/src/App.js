import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        setSuccess(true)
        setMessage(
          `Added ${newTitle}`
        )
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
      })
      .catch(error => {
        setSuccess(false)
        setMessage(
          `Failed to add ${newTitle} to server`
        )
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
        setBlogs(blogs.filter(person => person.id !== blogObject.id))
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }


  const addLike = b => {
    const copy = blogs.find(blog => blog.title === b.title)
    const addedLike = b.likes + 1
    const changedBlog = { ...copy, likes: addedLike}
    
    blogService
      .update(changedBlog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== changedBlog.id ? blog : returnedBlog))

        setSuccess(true)
        setMessage(
          `Updated ${b.title} likes`
        )
        setTimeout(() => {
          setMessage(null)
          setSuccess(null)
        }, 5000)
      })
      .catch(error => {
        setSuccess(false)
        setMessage(
          `Failed to add like to ${b.title}`
        )
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
          setMessage(
            `removed ${blogToDelete.title}`
          ),
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
        )
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

  return (
    <div>
      <h2>Bloglist</h2>
        <Notification message={message} success={success}/>
      <h2>add a new blog</h2>
        <NewBlog addBlog={addBlog} 
          newTitle={newTitle} handleTitleChange={handleTitleChange} 
          newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} 
          newUrl={newUrl}  handleUrlChange={handleUrlChange}
        />
      <h2>Blogs</h2>
        <Blogs blogs={blogs} addLike={addLike} removeBlog={removeBlog} />
    </div>
  )

}

export default App