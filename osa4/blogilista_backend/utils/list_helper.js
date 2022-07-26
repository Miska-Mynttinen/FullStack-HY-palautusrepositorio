var lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let initialValue = 0
  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (sumOfLikes, currentValue) => sumOfLikes + currentValue.likes, initialValue
    )
}

const favoriteBlog = (blogs) => {
  let maxValue = 0

  const helper = (previousValue, currentValue) => {
    maxValue = Math.max(previousValue, currentValue)
  }

  let i = 0
  while(i < blogs.length) {
    helper(maxValue, blogs[i].likes)
    i = i + 1
  }
  const ret = blogs.find(blog => blog.likes === maxValue)
  return ret
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const authors = blogs.map(blog => blog.author)
  const authorsBlogsCount = {}

  authors.forEach(author => {
    authorsBlogsCount[author] = (authorsBlogsCount[author] || 0) + 1
  })

  const mostBlogsAmount = Math.max(Object.values(authorsBlogsCount)[0])

  const authorWithMostBlogs = Object.entries(authorsBlogsCount).map(([key, value]) => ([key, (value === mostBlogsAmount)]))[0][0]

  return { author: authorWithMostBlogs, blogs: mostBlogsAmount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}