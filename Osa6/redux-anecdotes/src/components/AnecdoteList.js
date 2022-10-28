import React, { useEffect } from 'react'
import { vote, initialize } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    
    const dispatch = useDispatch()

    useEffect(() => {
     dispatch(initialize(anecdotes))
    }, [dispatch])

    const voteAnecdote = (id) => {
      dispatch(setNotification('Added new vote', 5))
      dispatch(vote(id))
    }

    const anecdoteSort = () => {
      const byVotes = (b1, b2) => b2.votes - b1.votes
      return(
        anecdotes.sort(byVotes).map(anecdote => 
        <><div key={anecdote.id}> 
          {anecdote.content}
        </div>
        <div> 
          has {anecdote.votes}
          <button onClick={() => voteAnecdote(anecdote.id)}> vote </button>
        </div></>
        )
      )
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdoteSort()}
        </>
    )
}

export default AnecdoteList