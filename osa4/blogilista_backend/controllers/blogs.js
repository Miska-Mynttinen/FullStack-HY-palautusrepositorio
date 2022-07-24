const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title, author or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
  })

  const savedBlog = await blog.save()
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


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter