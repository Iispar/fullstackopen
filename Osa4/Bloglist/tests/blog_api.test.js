const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})

test('blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})  

test('posting blogs work', async () => {

  const uusiBlog = {
    title: 'Testi2',
    author: 'testi2 author',
    url: 'http://www.testi2.com',
    likes: '100',
  }
  await api.post('/api/blogs')
    .send(uusiBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const res = await api.get('/api/blogs')
  const contents = res.body.map(r => r.title)
  expect(res.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('Testi2')
})

test('if likes is undefined should it be 0', async () => {
  const uusiBlog = {
    title: 'Testi2',
    author: 'testi2 author',
    url: 'http://www.testi2.com',
  }
  await api.post('/api/blogs')
    .send(uusiBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)  
  
  const res = await api.get('/api/blogs')
  const newNote = res.body.filter(blog => blog.title === 'Testi2')
  expect(newNote.likes === 0)
})

test('blog without title or url is not added', async () => {
  const uusiBlog = {
    author: 'testi2 author',
  }
  await api.post('/api/blogs')
    .send(uusiBlog)
    .expect(400)
  const blogslen = await api.get('/api/blogs')
  expect(blogslen.body).toHaveLength(initialBlogs.length)

})

test('delete blog', async () => {
  const blogs = await Blog.find({})
  const blogToDelete = blogs[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogslen = await api.get('/api/blogs')
  expect(blogslen.body).toHaveLength(blogs.length - 1)
})

test('updating blogs', async () => {
  const blogs = await Blog.find({})
  const blogToEdit = blogs[0]

  await api.put(`/api/blogs/${blogToEdit.id}`)
    .send(
      { 
        likes: 13,
        author: 'Muutettu Author',
        url: 'http://test.com' 
      })
    .expect(200)
  
  const final = await Blog.find({})
  final.map((blog) => blog.toJSON())

  const editedBlog = final[0]

  expect(editedBlog.likes).toBe(13)
  expect(editedBlog.author).toBe('Muutettu Author')
  expect(editedBlog.url).toBe('http://test.com')

})

afterAll(() => {
  mongoose.connection.close()
})