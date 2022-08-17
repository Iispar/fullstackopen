import propTypes from 'prop-types'
import React , { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const user = props.user

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
  }

  const deleteBlog = () => {
    props.deleteBlog(blog)
  }

  return (
    <div>
      <li className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}> {buttonLabel} </button>
        <div style = {showWhenVisible}>
          <p> {blog.url} </p>
          <p> {blog.likes} <button type="button" onClick={increaseLikes}> like </button> </p>
        </div>


        {(blog.user?.username === user.username) && (
          <button onClick={deleteBlog}>
          delete
          </button>
        )}
      </li>
    </div>
  )
}

// <div style={showWhenVisible}>
//         <p>{blog.url}</p>
//         <p>{ blogObject.likes } <button id='like-button' onClick={increaseLikes}>like</button></p>
//         <button id='remove' onClick={removeBlog}>remove</button>
//       </div>

Blog.propTypes = {
  updateBlog: propTypes.func.isRequired,
  deleteBlog: propTypes.func.isRequired
}

export default Blog