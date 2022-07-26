const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    _id: '62e005f8646c1d0b59c739e1',
    username: 'tester',
    name: 'Test User',
    password: '1234'
  },
  {
    _id: '62e005d2646c1d0b59c739de',
    username: 'other',
    name: 'Other User',
    password: '4567'
  },
]

const initialBlogs = [
  {
    _id: '62d4695011241e8223aebfc7',
    title: 'Turha blogi',
    author: 'Pekka Pouta',
    url: 'turha_blogi.fi',
    likes: 7,
    user: initialUsers[0]._id
  },
  {
    _id: '62d469fc9d64be138624c290',
    title: 'Testi Blogi',
    author: 'Make Matala',
    url: 'testi_blogi.fi',
    likes: 5,
    user: initialUsers[0]._id
  },
  {
    _id: '62d5be9a169eba7465449dcb',
    title: 'Kissablogi',
    author: 'Jussi Jussila',
    url: 'kissatjee.fi',
    likes: 3,
    user: initialUsers[0]._id
  },
  {
    _id: '62d977c98b60e75abb7bdf78',
    title: 'Matkablogi',
    author: 'Taina Taru',
    url: 'Matkailuni.fi',
    likes: 0,
    user: initialUsers[1]._id
  },
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author:'removethisauthor', url: 'removethisurlsoon.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}