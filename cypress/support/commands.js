export function fakeLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb, err) => {
        if (latitude && longitude) {
          return cb({ coords: { latitude, longitude } })
        }
        throw err({ code: 1 }) // 1: rejected, 2: unable, 3: timeout
      })
    }
  }
}

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:6969/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000', fakeLocation(48, 2))
  })
})

Cypress.Commands.add('mockGeolocation', (latitude = 60.192059, longitude = 24.945831) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, 'getCurrentPosition', (callback) => {
      return callback({ coords: { latitude, longitude } })
    })
  })
})

Cypress.Commands.add('watchIntro', () => {
  cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
  cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
  cy.get('.ui.massive.icon.circular.basic.inverted.button').click()
  cy.get('.ui.massive.icon.green.basic.circular.inverted').click()
})

Cypress.Commands.add('addGame', () => {
  const user = {
    username: 'WillSmith',
    name: 'Will Smith',
    password: 'siikret'
  }

  cy.request('POST', 'http://localhost:6969/api/users/', user)
  cy.request('POST', 'http://localhost:6969/api/login', {
    username: user.username, password: user.password
  }).then(({ body }) => {
    console.log('body', body)
    cy.request({
      method: 'POST',
      url: 'http://localhost:6969/api/games',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${body.token}`
      },
      body: {
        'durationMins': 3,
        'location': {
          'lat': 48,
          'lng': 2
        },
        'desc': 'Chillin out maxin relaxin all cool and all shootin some b- ball outside of the school',
        'maxParticipants': 3
      }
    }

    )
  })

})
