const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Blog = require('./models/blog')

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})


app.get('/api/blogs/:id', (request, response, next) => {
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


app.post('/api/blogs', (request, response, next) => {
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


app.put('/api/blogs/:id', (request, response, next) => {
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


app.get('/info', (request, response, next) => {
  const requestTime = new Date()
  Blog.find({}).then(blogs => {
    response.send(`<p>Bloglist has info for ${blogs.length} blogs</p><p>${requestTime}</p>`)
  })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})