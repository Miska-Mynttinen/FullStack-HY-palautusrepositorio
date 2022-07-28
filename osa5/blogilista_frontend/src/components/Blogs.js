import React from 'react'

const Blogs = ({blogs, addLike, removeBlog}) => {
  return (
    <>
      {blogs.map(b => 
        <div key={b.title}>
          <Blog key={b.title} title={b.title} author={b.author} url={b.url} likes={b.likes} />
          <Button handleClick={() => addLike(b)} handleDelete={() => removeBlog(b)} />
        </div>
      )}
    </>
  )
}


const Blog = (props) => {
  return (
    <ul>
      <h4>{props.title}</h4>
      <li>{props.author}</li>
      <li>{props.url}</li>
      <li>{props.likes}</li>
    </ul>
  )
}

const Button = ({handleClick, handleDelete}) => (
  <>
  <button onClick={handleClick}>
    like
  </button>
  <button onClick={handleDelete}>
    delete
  </button>
  </>
)

export default Blogs