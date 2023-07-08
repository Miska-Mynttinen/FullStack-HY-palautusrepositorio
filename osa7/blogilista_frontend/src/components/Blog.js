import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
        <div style={hideWhenVisible} className="blogTitle">
          <h4>
            <Link to={`/blogs/${props.id}`}>{props.title}</Link>
            <button onClick={handleView}>view</button>
          </h4>
          <li>{props.author}</li>
        </div>
        <div style={showWhenVisible} className="blogFull">
          <h4>
            {props.title} <button onClick={handleView}>hide</button>
          </h4>
          <li>{props.author}</li>
          <li>{props.url}</li>
          <li>
            {props.likes} likes
            <LikeButton handleClick={props.addLike} />
            <DeleteButton
              handleDelete={props.removeBlog}
              owner={props.checkOwner}
            />
          </li>
          <li>{props.username}</li>
        </div>
      </ul>
    </div>
  )
}

const LikeButton = ({ handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>like</button>
    </>
  )
}

const DeleteButton = ({ handleDelete, owner }) => {
  if (owner) {
    return (
      <>
        <button onClick={handleDelete}>delete</button>
      </>
    )
  } else {
    return <></>
  }
}

LikeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired,
}

export default Blog
