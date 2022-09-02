import { useState } from 'react'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, addLike, removeBlog, user }) => {
  blogs = blogs.sort((a,b) => b.likes - a.likes)

  const checkOwner = (blog, user) => {
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }
  
  return (
    <>
      {blogs.map(b => 
        <div key={b.title}>
          <Blog key={b.title} title={b.title} author={b.author} url={b.url} likes={b.likes} />
          <Button handleClick={() => addLike(b)} handleDelete={() => removeBlog(b)} owner={checkOwner(b, user)} />
        </div>
      )}
    </>
  )
}


const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const handleView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle}>
      <ul>
        <div style={hideWhenVisible}>
          <h4>{props.title} <button onClick={handleView}>view</button></h4>
        </div>
        <div style={showWhenVisible}>
          <h4>{props.title} <button onClick={handleView}>hide</button></h4>
          <li>{props.author}</li>
          <li>{props.url}</li>
          <li>{props.likes}</li>
        </div>
      </ul>
    </div>
  )
}


const Button = ({handleClick, handleDelete, owner}) => {
  if (owner) {
    return (
      <>
        <button onClick={handleClick}>
          like
        </button>
        <button onClick={handleDelete}>
          delete
        </button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={handleClick}>
          like
        </button>
      </>
    )
  }
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  })
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired
}

export default Blogs