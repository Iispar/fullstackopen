import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../utils/anecdotes'



const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE': {
      const id = action.data.id
      const AnecdoteToLike = state.find(n => n.id === id)
      const newAnecdote = {
        ...AnecdoteToLike,
        votes: AnecdoteToLike.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    }
    case 'CREATE' :
      return state.concat(action.data)

    case 'INIT' :
      return action.data

    default:
      return state
  }
}

export const initialize = ( anecdotes ) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const create = (input) => {
  return async (dispatch) => {
    const content = await anecdoteService.createNew(input)
    dispatch({
      type: 'CREATE',
      data: content
    })
  }
}

export default anecdoteReducer