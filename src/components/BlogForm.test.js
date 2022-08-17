import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const input = container.querySelector('#title')
  const form = container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing a form...' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})