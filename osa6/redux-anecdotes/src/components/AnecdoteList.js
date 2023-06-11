import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const ListAnecdotes = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`you voted ${anecdotes.find(n => n.id === id).content}`))
    setTimeout(() => { 
      dispatch(setNotification('')) 
    }, 5000)
  }

  return (
    <>
      {anecdotes.sort((a,b) => b.votes - a.votes)
                .map(anecdote =>
        <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
        </div>
      )}
    </>
  )
}

export default ListAnecdotes