const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await User.insertMany(helper.initialUsers)
  await Blog.insertMany(helper.initialBlogs)

  const userForToken = {
    username: helper.initialUsers[0].username,
    id: helper.initialUsers[0]._id,
  }
  token = await jwt.sign(userForToken, process.env.SECRET)
})

describe('HTTP GET tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContainEqual(
      'Turha blogi'
    )
  })

  test('blog has id as identyfying field', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})


describe('Blog id tests, viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const BlogsAtStart = await helper.blogsInDb()

    const BlogToView = BlogsAtStart[0]

    const resulBlog = await api
      .get(`/api/blogs/${BlogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(BlogToView))

    expect(resulBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('HTTP POST tests', () => {

  test('a valid blog can be added with a valid token', async () => {
    const newBlog = {
      title: 'Async post test blog',
      author: 'Test Tester',
      url: 'blogPostTesting.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContainEqual(
      'Async post test blog'
    )
  })

  test('an unauthorized blog cant be added', async () => {
    const newBlog = {
      title: 'Async post test blog',
      author: 'Test Tester',
      url: 'blogPostTesting.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${123123321}`)
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if no value for blogs likes is set, set liket to 0(it is always 0 at the start already)', async () => {
    const newBlog = {
      title: 'Likes post test blog',
      author: 'Like Tester',
      url: 'blogLikeTesting.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const lastBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes
    expect(lastBlogLikes).toEqual(0)
  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'NotAdded Tester',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without author is added', async () => {
    const newBlog = {
      title: 'No author post test blog',
      url: 'blogNoAuthorTesting.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContainEqual(
      'No author post test blog'
    )
  })
})


describe('deletion of a blog with DELETE', () => {
  test('succeeds with status code 204 if id is valid and token is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContainEqual(blogToDelete.title)
  })

  test('fails because on unauthorized token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${1231234124}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContainEqual(blogToDelete.title)
  })
})


describe('updating likes of a blog with PUT', () => {
  test('succeeds at updating a blogs likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdateLikes = blogsAtStart[0]
    blogToUpdateLikes.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdateLikes.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(blogToUpdateLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})