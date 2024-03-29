import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationNew } from '../reducers/notificationReducer'

const NewBlog = ({ blogs, setSuccess, newBlogRef }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const dispatch = useDispatch()

  const addBlog = async event => {
    event.preventDefault()
    if (
      blogs.find(
        b => b.title === newTitle && b.author === newAuthor && b.url === newUrl
      )
    ) {
      setSuccess(false)
      dispatch(
        setNotificationNew(
          `exact copy of: '${newTitle}' is already in the bloglist`,
          5
        )
      )
      return
    }
    newBlogRef.current.toggleVisibility()

    try {
      await dispatch(
        createBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: 0,
        })
      )
      setSuccess(true)
      dispatch(setNotificationNew(`Added ${newTitle}`, 5))
    } catch (error) {
      setSuccess(false)
      dispatch(setNotificationNew(`Failed to add ${newTitle} to server`, 5))
    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="add title"
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="add author"
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="add url"
          />
        </div>
        <div>
          <button id="add-blog-button" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlog
