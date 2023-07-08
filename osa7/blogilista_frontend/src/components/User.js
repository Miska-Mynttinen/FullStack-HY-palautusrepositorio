import { useMatch } from 'react-router-dom'

const User = ({ users }) => {
  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>
            {b.title}
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default User
