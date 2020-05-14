describe('Pick-up game finder', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:6969/api/testing/reset')

    const user = {
      username: 'ogrousu',
      name: 'Olli Rousu',
      password: 'supersalainen'
    }
    cy.request('POST', 'http://localhost:6969/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Pickupgame finder')
    cy.contains('Find local pickupgames and start balling')
  })

  it('user can log in', function () {
    cy.get('#login-username').type('ogrousu')
    cy.get('#login-password').type('supersalainen')
    cy.get('#login-button').click()

    cy.contains('Welcome ogrousu')
  })

  it('A user can be created', function () {
    cy.get('#username').type('ollij')
    cy.get('#name').type('Olli Rousu')
    cy.get('#password').type('hypersalainen')
    cy.get('#accountCreation-button').click()

    cy.contains('Welcome ollij')
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ogrousu', password: 'supersalainen' })
    })

    it('A new game can be created', function () {
      cy.contains('New Game').click()
      cy.get('#duration').type(2)
      cy.get('#description').type('Come 1v1 me')
      cy.get('#participants').type(2)
      cy.get('#gamecreation-button').click()

      cy.contains('Created a game for 2 players!')
    })

    it('User can logout', function () {
      cy.contains('Logout').click()

      cy.contains('Pickupgame finder')
    })
  })
})