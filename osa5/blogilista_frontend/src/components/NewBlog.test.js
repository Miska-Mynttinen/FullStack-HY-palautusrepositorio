import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'



describe('<NewBlog />', () => {

  test('NewBlog form calls return function given as props with right information when a new blog is created', async () => {
    // setup mock handler and user
    const newBlogMock = jest.fn()
    render(<NewBlog createBlog={newBlogMock} />)

    // check that top text of NewBlog is rendered
    expect(screen.getByText('add a new blog')).toHaveTextContent('add a new blog')

    // get input places of placeholder texts given in the code because multiple textboxes
    const inputTitle = screen.getByPlaceholderText('add title')
    const inputAuthor = screen.getByPlaceholderText('add author')
    const inputUrl = screen.getByPlaceholderText('add url')
    const addButton = screen.getByText('add')

    const user = userEvent.setup()
    await user.type(inputTitle, 'testi title joku')
    await user.type(inputAuthor, 'testi author joku')
    await user.type(inputUrl, 'testi url joku')
    await user.click(addButton)

    expect(newBlogMock.mock.calls).toHaveLength(1)
    expect(newBlogMock.mock.calls[0][0].title).toBe('testi title joku')
    expect(newBlogMock.mock.calls[0][0].author).toBe('testi author joku')
    expect(newBlogMock.mock.calls[0][0].url).toBe('testi url joku')
  })

})
