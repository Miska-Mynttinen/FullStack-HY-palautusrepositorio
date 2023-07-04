//var lodash = require('lodash')

const dummy = (blogs) => { // eslint-disable-line
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

  const mostBlogsAmount = Math.max(...Object.values(authorsBlogsCount))

  const authorWithMostBlogs = (Object.entries(authorsBlogsCount).filter(([key, value]) => [key, value][1] === mostBlogsAmount))[0][0]

  return { author: authorWithMostBlogs, blogs: mostBlogsAmount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const authorsLikesCount = {}

  blogs.forEach(blog => {
    authorsLikesCount[blog.author] = (authorsLikesCount[blog.author] || 0) + blog.likes
  })

  const mostLikesAmount = Math.max(...Object.values(authorsLikesCount))

  const authorWithMostBlogs = (Object.entries(authorsLikesCount).filter(([key, value]) => [key, value][1] === mostLikesAmount))[0][0]

  return { author: authorWithMostBlogs, likes: mostLikesAmount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}