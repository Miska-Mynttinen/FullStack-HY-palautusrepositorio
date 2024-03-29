import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotificatioDispatch, addNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = useNotificatioDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch(addNotification('too short anecdote, must have length 5 or more'))
      setTimeout(() => { 
        notificationDispatch(addNotification(''))
      }, 5000)
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch(addNotification(`you added '${content}'`))
    setTimeout(() => { 
      notificationDispatch(addNotification(''))
    }, 5000)
  }

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
    },
  })

  const handleVote = (anecdote) => {
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      voteMutation.mutate(changedAnecdote)
      notificationDispatch(addNotification(`anecdote '${anecdote.content}' voted`))
      setTimeout(() => { 
        notificationDispatch(addNotification(''))
      }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, { refetchOnWindowFocus: false })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
