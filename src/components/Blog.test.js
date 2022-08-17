import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog component tests', () => {
  var blog = {
    title: 'Test blog',
    author: 'Test author',
    likes: '10',
    url: 'www.test.com'
  }
  var mockUpdateBlog = jest.fn()
  var mockDeleteBlog = jest.fn()

  test('renders title and author',() => {
    const component = render(<Blog blog={blog} updateBlog = { mockUpdateBlog } deleteBlog = { mockDeleteBlog } user = {'123'}/>)
    expect(component.container).toHaveTextContent(
      'Test blog Test author'
    )
  })

  test('renders likes and url when clicked', () => {
    const component = render(<Blog blog={blog} updateBlog = { mockUpdateBlog } deleteBlog = { mockDeleteBlog } user = {'123'}/>)
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.test.com')
    expect(component.container).toHaveTextContent('10')
  })

  test('clicking like works', () => {
    const component = render(<Blog blog={blog} updateBlog = { mockUpdateBlog } deleteBlog = { mockDeleteBlog } user = {'123'}/>)
    const viewButton = component.getByText('view')
    const likeButton = component.getByText('like')
    fireEvent.click(viewButton)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)

  })
})