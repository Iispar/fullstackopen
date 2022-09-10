const Blog = require('../models/blog')
const testingRouter = require('express').Router()



testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter