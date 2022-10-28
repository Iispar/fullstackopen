import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote= () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
      event.preventDefault()
      const data = event.target.anecdote.value
      event.target.anecdote.value = ''
      
      dispatch(create(data))


      dispatch(setNotification('Added new anecdote', 5))
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