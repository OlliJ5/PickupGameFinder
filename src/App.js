import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import FrontPage from './components/FrontPage/FrontPage'
import Map from './components/MapPage/Map'
import { initializeGames } from './reducers/gameReducer'
import { stayLoggedIn } from './reducers/userReducer'
import { changeLocation } from './reducers/locationReducer'
import { changeColor } from './reducers/colorSchemeReducer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Intro from './components/Intro/Intro'
import Profile from './components/Profile/Profile'

toast.configure({
  autoClose: 3500,
  hideProgressBar: true
})

const App = (props) => {
  const initGames = props.initializeGames
  const keepUserLogged = props.stayLoggedIn
  const setLocation = props.changeLocation
  const changeColor = props.changeColor
  const colorScheme = props.colorScheme

  useEffect(() => {
    initGames()
  }, [initGames])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      keepUserLogged(user)
    }
  }, [keepUserLogged])

  useEffect(() => {
    setLocation()
  }, [setLocation])

  useEffect(() => {
    const colorScheme = window.localStorage.getItem('colorScheme')
    if (colorScheme) {
      changeColor(colorScheme)
    } else {
      changeColor('light')
    }
  }, [changeColor])

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.body.classList.add('bodyDark')
    } else if (colorScheme === 'light') {
      document.body.classList.remove('bodyDark')
    }
  }, [colorScheme])

  if (props.user === null) {
    return (
      <div>
        <FrontPage colorScheme={props.colorScheme} />
      </div>
    )
  }
  return (
    <Router basename='/'>
      <Switch>
        <Route path='/profile'>
          <div>
            <Profile />
          </div>
        </Route>
        <Route path='/'>
          {props.user.showIntro && (
            <Intro />
          )}
          {!props.user.showIntro && (
            <Map />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { initializeGames, stayLoggedIn, changeLocation, changeColor })(App)
