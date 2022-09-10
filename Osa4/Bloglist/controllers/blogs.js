
const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  return request.token
}

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blog)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  console.log('meni läpi')
  const { body } = request
  const { id } = request.params
  const blog = {
    title: body.title,
    likes: body.likes,
    author: body.author,
    url: body.url
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON())
  }
  else{
    response.status(404).end()
  }
})

module.exports = blogsRouter