const user = {
  name: 'tester user',
  username: 'tester',
  password: '1234',
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('tester user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // uses login command in cypress/support/commands
      cy.login({ username: 'tester', password: '1234' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('newTestBlog')
      cy.get('#author').type('newTestAuthor')
      cy.get('#url').type('newTestUrl')
      cy.get('#add-blog-button').click()

      cy.contains('newTestBlog')
      // clicks the view button on the new blog based on author to show url and the amount of likes
      cy.contains('newTestAuthor')
        .parent()
        .find('button')
        .contains('view')
        .click()
      cy.contains('newTestUrl')
      cy.contains('0')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1',
      })

      cy.contains('testBlog1').parent().find('button').contains('view').click()
      cy.contains('0').find('button').contains('like').click()
      cy.contains('1')
    })

    it('User can delete their own blog', function () {
      // the user is the same as the one initiated in beforeEach for the login and the creation of the blog
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1',
      })

      cy.contains('testBlog1').contains('view').click()
      cy.contains('delete').click()
      //cheks if removed succesfully notification is seen
      cy.contains('removed testBlog1')
      // checks for author because both can be seen normally and otherwise takes into account the notifications text
      cy.contains('testBlogger1').should('not.exist')
    })

    it('Users who do not own the blog can not see the delete button', function () {
      // the user is the same as the one initiated in beforeEach for the login and the creation of the blog
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1',
      })
      // logout after creating blog
      cy.contains('logout').click()

      // create new user and login as them
      const user2 = {
        name: 'tester user2',
        username: 'tester2',
        password: '5678',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.contains('login').click()
      cy.get('#username').type('tester2')
      cy.get('#password').type('5678')
      cy.get('#login-button').click()
      cy.contains('tester user2 logged in')

      cy.contains('testBlog1').contains('view').click()
      cy.contains('delete').should('not.exist')
    })

    it('Blogs are arranged by the amount of likes from most to least', function () {
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1',
      })
      cy.createBlog({
        title: 'testBlog2',
        author: 'testBlogger2',
        url: 'testBlogWebsite2',
      })
      cy.createBlog({
        title: 'testBlog3',
        author: 'testBlogger3',
        url: 'testBlogWebsite3',
      })

      // check original blog order
      cy.get('ul').eq(0).contains('testBlog1')
      cy.get('ul').eq(1).contains('testBlog2')
      cy.get('ul').eq(2).contains('testBlog3')

      // like the second blog once
      cy.contains('testBlog2').parent().find('button').contains('view').click()
      cy.contains('testBlogWebsite2')
        .parent()
        .contains('0')
        .find('button')
        .contains('like')
        .click()
      cy.contains('testBlog2').parent().contains('1')

      // like the third blog twice
      cy.contains('testBlog3').parent().find('button').contains('view').click()
      cy.contains('testBlogWebsite3')
        .parent()
        .contains('0')
        .find('button')
        .contains('like')
        .click()
      cy.contains('testBlogWebsite3')
        .parent()
        .contains('1')
        .find('button')
        .contains('like')
        .click()
      cy.contains('testBlogWebsite3').parent().contains('2')

      // view the first blogs likes also
      cy.contains('testBlog1').parent().find('button').contains('view').click()
      cy.contains('testBlogWebsite1').parent().contains('0')

      // check that the blogs are ordered by the amount of likes
      cy.get('ul').eq(0).contains('testBlog3')
      cy.get('ul').eq(1).contains('testBlog2')
      cy.get('ul').eq(2).contains('testBlog1')
    })
  })
})
