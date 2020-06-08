import { fakeLocation } from '../support/commands'

describe('Pick-up game finder', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:6969/api/testing/reset')

    const user = {
      username: 'ogrousu',
      name: 'Olli Rousu',
      password: 'supersalainen'
    }
    cy.request('POST', 'http://localhost:6969/api/users/', user)

    cy.visit('http://localhost:3000', fakeLocation(48, 2))
  })

  it('front page can be opened', function () {
    cy.contains('Pickupgame finder')
    cy.contains('Find local pickupgames and start playing!')
  })

  it('user can log in', function () {
    cy.get('#login-username').type('ogrousu')
    cy.get('#login-password').type('supersalainen')
    cy.get('#login-button').click()

    cy.contains('Welcome ogrousu')
  })

  it('A user can be created and intro is shown', function () {
    cy.get('#username').type('ollij')
    cy.get('#name').type('Olli Rousu')
    cy.get('#password').type('hypersalainen')
    cy.get('#accountCreation-button').click()

    cy.contains('Welcome ollij')

    cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
    cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
    cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
    cy.get('.ui.massive.icon.green.basic.circular.inverted').click()

    cy.contains('Home')
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ogrousu', password: 'supersalainen' })
      cy.watchIntro()
    })

    it('A new game can be created', function () {
      cy.contains('New Game').click()
      cy.get('#duration').type(2)
      cy.get('#description').type('Come 1v1 me')
      cy.get('#participants').clear().type(2)
      cy.get('#gamecreation-button').click()

      cy.contains('Created a game for 2 players!')
    })

    it('User can view their profile and toggle to darkmode', function () {
      cy.contains('ogrousu').click()
      cy.contains('Profile').click()
      cy.contains('Game History').click()
      cy.contains('Created Games')
      cy.get('#color-toggle').click({ force: true })
      cy.get('body').should('have.class', 'bodyDark')
      cy.contains('Home').click()
    })

    it('User can logout', function () {
      cy.contains('ogrousu').click()
      cy.contains('Logout').click()

      cy.contains('Pickupgame finder')
    })

    describe('And a game has been created', function () {
      it('User can join a game', function () {
        cy.addGame()
        cy.login({ username: 'ogrousu', password: 'supersalainen' })
        cy.visit('http://localhost:3000', fakeLocation(48, 2))

        cy.get('#game').click()
        cy.contains('Join').click()

        cy.contains('Joined')
      })


    })


  })
})