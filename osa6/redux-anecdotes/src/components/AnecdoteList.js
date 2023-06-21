import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotificationNew } from '../reducers/notificationReducer'

const ListAnecdotes = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(setNotificationNew(`you voted ${anecdotes.find(n => n.id === id).content}`, 5))
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