import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = ({ blogs, addLike, removeBlog, user }) => {
  blogs = blogs.sort((a,b) => b.likes - a.likes)

  const checkOwner = (blog, user) => {
    if (blog.user.username === user.username) {
      return true
    } else {
      return false
    }
  }

  //chechowner needs to be constantly checked for user so the delete button doesn't show if someone logs in with a different account.
  return (
    <>
      {blogs.map(b =>
        <div key={b.title}>
          <Blog key={b.title} title={b.title} author={b.author} url={b.url} likes={b.likes} addLike={() => addLike(b)} removeBlog={() => removeBlog(b)} checkOwner={checkOwner(b, user)} />
        </div>
      )}
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
  })
}

export default Blogs