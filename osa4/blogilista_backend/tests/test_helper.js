const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    id: '62d4695011241e8223aebfc7',
    title: 'Turha blogi',
    author: 'Pekka Pouta',
    url: 'turha_blogi.fi',
    likes: 7
  },
  {
    id: '62d469fc9d64be138624c290',
    title: 'Testi Blogi',
    author: 'Make Matala',
    'url': 'testi_blogi.fi',
    'likes': 5
  },
  {
    id: '62d5be9a169eba7465449dcb',
    title: 'Kissablogi',
    author: 'Jussi Jussila',
    url: 'kissatjee.fi',
    likes: 3
  },
  {
    id: '62d977c98b60e75abb7bdf78',
    title: 'Matkablogi',
    author: 'Taina Taru',
    url: 'Matkailuni.fi',
    likes: 0
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
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}