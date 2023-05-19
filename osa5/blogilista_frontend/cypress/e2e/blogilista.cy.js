const user = {
  name: 'tester user',
  username: 'tester',
  password: '1234'
}


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })


  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('tester user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      // uses login command in cypress/support/commands
      cy.login({ username: 'tester', password: '1234' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('newTestBlog')
      cy.get('#author').type('newTestAuthor')
      cy.get('#url').type('newTestUrl')
      cy.get('#add-blog-button').click()

      cy.contains('newTestBlog')
      // clicks the view button on the new blog based on author to show url and the amount of likes
      cy.contains('newTestAuthor').parent().find('button').contains('view').click()
      cy.contains('newTestUrl')
      cy.contains('0')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1'
      })

      cy.contains('testBlog1').parent().find('button').contains('view').click()
      cy.contains('0').find('button').contains('like').click()
      cy.contains('1')
    })

    it.only('User can delete their own blog', function() {
      // the user is the same as the one initiated in beforeEach for the login and the creation of the blog
      cy.createBlog({
        title: 'testBlog1',
        author: 'testBlogger1',
        url: 'testBlogWebsite1'
      })

      cy.contains('testBlog1').contains('view').click()
      cy.contains('delete').click()
      //cheks if removed succesfully notification is seen
      cy.contains('removed testBlog1')
      // checks for author because both can be seen normally and otherwise takes into account the notifications text
      cy.contains('testBlogger1').should('not.exist')
    })
  })
})