import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const NewAnecdote= () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(create(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {createNew}>
            <input name = 'anecdote'/>
            <button type = 'submit'>create</button>
            </form>
        </div>
    )
}

export default NewAnecdote