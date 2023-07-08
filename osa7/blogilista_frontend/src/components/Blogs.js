import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { blogLike, blogDelete } from '../reducers/blogReducer'
import { setNotificationNew } from '../reducers/notificationReducer'

const Blogs = ({ blogs, setSuccess, user }) => {
  const dispatch = useDispatch()

  blogs = blogs.sort((a, b) => b.likes - a.likes)

  const checkOwner = (blog, user) => {
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }

  const addLike = async b => {
    try {
      await dispatch(blogLike(b.id))
      setSuccess(true)
      dispatch(setNotificationNew(`Updated ${b.title} likes`, 5))
    } catch (error) {
      setSuccess(false)
      dispatch(setNotificationNew(`Failed to add like to ${b.title}`, 5))
    }
  }

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      try {
        await dispatch(blogDelete(blogToDelete.id))

        setSuccess(true)
        dispatch(setNotificationNew(`removed ${blogToDelete.title}`, 5))
      } catch (error) {
        setSuccess(false)
        dispatch(
          setNotificationNew(
            `The number ${blogToDelete.title} was already deleted from server`,
            5
          )
        )
      }
    }
  }

  //checkowner needs to be constantly checked for user so the delete button doesn't show if someone logs in with a different account.
  return (
    <>
      {blogs.map(b => (
        <div key={b.id}>
          <Blog
            key={b.id}
            id={b.id}
            title={b.title}
            author={b.author}
            url={b.url}
            likes={b.likes}
            username={b.user.username}
            addLike={() => addLike(b)}
            removeBlog={() => removeBlog(b)}
            checkOwner={checkOwner(b, user)}
          />
        </div>
      ))}
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default Blogs
