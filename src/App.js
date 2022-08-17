import React, { useState, useEffect, useRef }  from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setSuccessMessage('Successful login')
      setTimeout(() => {
        setSuccessMessage(null)}, 1000)

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    }
    catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)}, 1000)
    }
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    console.log('Creating a new blog')
    console.log(newBlog)
    console.log(user)

    try{
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage('Successfully created blog')
      setTimeout(() => {
        setSuccessMessage(null)}, 500)

    } catch(exception){
      setErrorMessage('Cannot add blog')
      setTimeout(() => {
        setErrorMessage(null)}, 500)
    }
  }

  const updateBlog = async(blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)

      setSuccessMessage('Successfully updated blog')
      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (exception){
      console.log('ei toiminut')
    }
  }

  const deleteBlog = async(blogToDelete) => {
    try {
      if (window.confirm(`remove ${blogToDelete.id} by ${blogToDelete.author}`)){
        await blogService.deleteBlog(blogToDelete.id)
        setBlogs(blogs.filter((blog) => blog.iud !== blogToDelete.id))
      }

      setSuccessMessage('Successfully deleted blog')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    }
    catch (exception) {
      console.log('ei toiminut')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification errorMessage = {errorMessage} successMessage = {successMessage}/>
        <h2> Log in to application </h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      </div>
    )
  }

  else {
    return (
      <div>
        <Notification errorMessage = {errorMessage} successMessage = {successMessage}/>
        <div>

          <h2> blogs </h2>
          <h2> create new </h2>

          <Togglable buttonLabel = "new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                user = {user}
                key = {blog.id}
                blog = {blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            )}

        </div>
        <div>
          <form onSubmit={() => window.localStorage.removeItem('loggedBlogappUser')}>
            <button type="submit"> log out </button>
          </form>
        </div>
      </div>
    )
  }
}

export default App
