import { useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { blogLike } from '../reducers/blogReducer'
import { setNotificationNew } from '../reducers/notificationReducer'

const BlogView = ({ blogs, setSuccess }) => {
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

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

  return (
    <div>
      <h1>
        {blog.title}
      </h1>
      <h2>{blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <LikeButton handleClick={() => addLike(blog)} />
      </div>
      <div>added by {blog.user.name}</div>
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

export default BlogView
