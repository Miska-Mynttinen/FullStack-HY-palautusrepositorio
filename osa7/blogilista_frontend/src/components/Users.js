import { Link } from 'react-router-dom'

const Users = ({ users }) => {
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
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  )
}

export default Users
