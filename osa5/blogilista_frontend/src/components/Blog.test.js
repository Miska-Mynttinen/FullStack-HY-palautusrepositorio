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
    username: 'testi'
  }
}

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} />
    ).container
  })


  test('default renders blog title and author, but not url or likes', () => {
    //Only title and author to render
    const divTitle = container.querySelector('.blogTitle')
    expect(divTitle).not.toHaveStyle('display: none', { exact: false })

    //url and likes don't render because they are no visible
    const divFull = container.querySelector('.blogFull')
    expect(divFull).toHaveStyle('display: none')


    /* Pointless other tries and didn't fully work the way I wanted.
    Div2.not.tobeVisible() kind of worked.

    const div = container.querySelector('.blogTitle')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)

    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)

    const div2 = container.querySelector('.blogFull')

    expect(div2).not.toBeVisible()
    expect(div2).toBeVisible()

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
})