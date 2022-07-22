const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithFourBlogs = [
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

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithFourBlogs)
    expect(result).toBe(15)
  })

})