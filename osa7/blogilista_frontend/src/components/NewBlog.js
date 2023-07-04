import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
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

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })

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
