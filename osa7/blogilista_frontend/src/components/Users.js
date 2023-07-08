import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(state => {
    return state.users
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>User</th>
          <th>blogs created</th>
        </tr>
        {users.map(user => (
          <div key={user.username}>
            <tr>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  )
}

export default Users
