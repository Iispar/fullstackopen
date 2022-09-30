/* eslint-disable cypress/no-unnecessary-waiting */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('user')
      cy.get('#password')
        .type('salasana')
      cy.get('#loginButton')
        .click()

      cy.contains('Successful login')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('user')
      cy.get('#password')
        .type('salasana2')
      cy.get('#loginButton')
        .click()

      cy.contains('Wrong credentials')

    })

  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('user')
      cy.get('#password')
        .type('salasana')
      cy.get('#loginButton')
        .click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()

      cy.contains('TestiTitle TestiAuthor')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()

      cy.contains('TestiTitle TestiAuthor')


      cy.contains('view')
        .click()
      cy.contains('0')
      cy.contains('like')
        .click()
      cy.contains('1')

    })

    it('A blog can be deleted', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()

      cy.contains('TestiTitle TestiAuthor')

      cy.contains('view')
        .click()
      cy.contains('delete')
        .click()

      cy.contains('TestiTitle TestiAuthor').should('not.exist')
    })
  })

  describe('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('user')
      cy.get('#password')
        .type('salasana')
      cy.get('#loginButton')
        .click()

      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle1')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()
      cy.wait(500)

      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle2')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()
      cy.wait(500)

      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('TestiTitle3')
      cy.get('#author')
        .type('TestiAuthor')
      cy.get('#url')
        .type('dasdas')
      cy.get('#createButton')
        .click()
      cy.wait(500)

      cy.contains('TestiTitle1').parent().as('Testi1')
      cy.contains('TestiTitle2').parent().as('Testi2')
      cy.contains('TestiTitle3').parent().as('Testi3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@Testi1').contains('view').click()
      cy.get('@Testi2').contains('view').click()
      cy.get('@Testi3').contains('view').click()
      cy.get('@Testi1').contains('like').as('like1')
      cy.get('@Testi2').contains('like').as('like2')
      cy.get('@Testi3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(1000)
      cy.get('@like1').click()
      cy.wait(1000)
      cy.get('@like1').click()
      cy.wait(1000)
      cy.get('@like3').click()
      cy.wait(1000)
      cy.get('@like3').click()
      cy.wait(1000)
      cy.get('@like3').click()
      cy.wait(1000)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})
