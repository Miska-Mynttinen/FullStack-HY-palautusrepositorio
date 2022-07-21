const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})


blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end
      }
    })
    .catch(error => next(error))
})


blogsRouter.post('/', (request, response, next) => {
  const body = new Blog(request.body)

  if (!body.title || !body.author || !body.url) {
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

  blog
    .save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})


blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  Blog.findByIdAndUpdate(request.params.id,
    { title, author, url, likes },
    { new: true }
  )
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

/*Doesn't work anymore because of changes but not needed in the program.
blogsRouter.get('../../info', (request, response, next) => {
  const requestTime = new Date()
  Blog.find({}).then(blogs => {
    response.send(`<p>Bloglist has info for ${blogs.length} blogs</p><p>${requestTime}</p>`)
  })
    .catch(error => next(error))
})*/

module.exports = blogsRouter