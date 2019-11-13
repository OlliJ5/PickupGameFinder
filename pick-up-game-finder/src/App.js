import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Map from './components/Map'
import LoginForm from './components/forms/LoginForm'
import NewAccountForm from './components/forms/NewAccountForm'
import NewGameForm from './components/forms/NewGameForm'
import { initializeGames } from './reducers/gameReducer'
import { stayLoggedIn } from './reducers/loginReducer'
import { changeLocation } from './reducers/locationReducer'


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
      <div>
        <LoginForm />
        {/* <NewAccountForm /> */}
      </div>
    )
  }
  return (
    <div>
      <NewGameForm />
      <Map />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeGames, stayLoggedIn, changeLocation })(App)
