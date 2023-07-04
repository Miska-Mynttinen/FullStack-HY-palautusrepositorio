import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Tester',
  url: 'testurl.fi',
  likes: '0',
  user: {
    name: 'Testi Testaaja',
    username: 'testi',
  },
}

describe('<Blog />', () => {
  let container
  const mockHandlerLike = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        addLike={mockHandlerLike}
      />
    ).container
  })

  test('default renders blog title and author, but not url or likes', () => {
    //Only title and author to render
    const divTitle = container.querySelector('.blogTitle')
    expect(divTitle).not.toHaveStyle('display: none', { exact: false })
    expect(divTitle).toBeVisible()

    //url and likes don't render because they are no visible
    const divFull = container.querySelector('.blogFull')
    expect(divFull).toHaveStyle('display: none')
    expect(divFull).not.toBeVisible

    /* Pointless other tries and didn't fully work the way I wanted.
    const div = container.querySelector('.blogTitle')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)

    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)

    const div2 = container.querySelector('.blogFull')

    expect(div2).not.toBeVisible()

    let element = screen.querySelector('.blogTitle').queryByText(blog.title)
    expect(element).toBeDefined()
    element = screen.querySelector('.blogTitle').queryByText(blog.author)
    expect(element).toBeDefined()

    element = screen.querySelector('.blogFull').queryByText(blog.url)
    expect(element).toBeNull()
    element = screen.querySelector('.blogFull').queryByText(blog.likes)
    expect(element).toBeNull()
    */
  })

  test('renders blog title, author, url and likes after view button is clicked.', async () => {
    jest.fn()
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const div = container.querySelector('.blogFull')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toBeVisible()
    expect(div).not.toHaveStyle('display: none')
  })

  test('when like button is clicked 2 times, components props event handler function is called 2 times', async () => {
    jest.fn()
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    const likeButton = screen.getByText('like')

    await user.click(viewButton)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
