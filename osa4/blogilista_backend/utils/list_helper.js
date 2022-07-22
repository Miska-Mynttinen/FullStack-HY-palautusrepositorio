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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}