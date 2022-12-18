import { useState } from 'react'

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
    <div style={blogStyle} >
      <ul>
        <div style={hideWhenVisible} className='blogTitle'>
          <h4>{props.title} <button onClick={handleView}>view</button></h4>
          <li>{props.author}</li>
        </div>
        <div style={showWhenVisible} className='blogFull'>
          <h4>{props.title} <button onClick={handleView}>hide</button></h4>
          <li>{props.author}</li>
          <li>{props.url}</li>
          <li>{props.likes}</li>
        </div>
      </ul>
    </div>
  )
}

export default Blog