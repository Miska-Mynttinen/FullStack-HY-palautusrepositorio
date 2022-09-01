import { useState } from 'react'

const Blogs = ({blogs, addLike, removeBlog}) => {
  blogs = blogs.sort((a,b) => b.likes - a.likes)
  
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