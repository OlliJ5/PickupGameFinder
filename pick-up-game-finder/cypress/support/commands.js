Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:6969/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
