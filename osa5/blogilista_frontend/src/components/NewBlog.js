import React from 'react'

const NewBlog = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url: <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <div> 
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewBlog