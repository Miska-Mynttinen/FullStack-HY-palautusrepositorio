const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
require('dotenv').config()

const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end
  }
})


blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor,  async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.put('/:id',  async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlogLikes = await Blog.findByIdAndUpdate(request.params.id,
    { title, author, url, likes },
    { new: true }
  )

  if (updatedBlogLikes) {
    response.json(updatedBlogLikes.toJSON())
  } else {
    response.status(404).end
  }
})


blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== request.user.id.toString() ) {
    return response.status(401).json({ error: 'unauthorizerd user token' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter