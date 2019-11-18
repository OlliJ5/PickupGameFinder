import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FrontPage from './components/FrontPage'
import MapPage from './components/MapPage'
import { initializeGames } from './reducers/gameReducer'
import { stayLoggedIn } from './reducers/loginReducer'
import { changeLocation } from './reducers/locationReducer'
import { Container } from 'semantic-ui-react'


const App = (props) => {
  useEffect(() => {
    props.initializeGames()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.stayLoggedIn(user)
    }
  }, [])

  useEffect(() => {
    props.changeLocation()
  }, [])

  if (props.user === null) {
    return (
      <Container>
        <FrontPage />
      </Container>
    )
  }
  return (
    <div>
      <MapPage />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeGames, stayLoggedIn, changeLocation })(App)
