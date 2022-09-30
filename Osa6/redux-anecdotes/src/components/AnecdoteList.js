import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const voteAnecdote = (id) => {
      dispatch(vote(id))
    }
  
    const anecdoteSort = () => {
      const byVotes = (b1, b2) => b2.votes - b1.votes
      return(
        anecdotes.sort(byVotes).map(anecdote => 
        <><div key={anecdote.id}> {anecdote.content} </div><div> has {anecdote.votes}
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