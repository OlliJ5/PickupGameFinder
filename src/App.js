import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FrontPage from './components/FrontPage/FrontPage'
import Map from './components/MapPage/Map'
import { initializeGames } from './reducers/gameReducer'
import { stayLoggedIn } from './reducers/userReducer'
import { changeLocation } from './reducers/locationReducer'
import { changeColor } from './reducers/colorSchemeReducer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Intro from './components/Intro'

toast.configure({
  autoClose: 3500,
  hideProgressBar: true
})

const App = (props) => {
  const initGames = props.initializeGames
  const keepUserLogged = props.stayLoggedIn
  const setLocation = props.changeLocation
  const changeColor = props.changeColor

  console.log('useri', props.user)

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

  if (props.user === null) {
    return (
      <div className={props.colorScheme === 'dark' ? 'bodyDark' : 'bodyLight'}>
        <FrontPage colorScheme={props.colorScheme} />
      </div>
    )
  }
  return (
    <div className={props.colorScheme === 'dark' ? 'bodyDark' : 'bodyLight'}>
      {props.user.showIntro && (
        <Intro />
      )}
      {!props.user.showIntro && (
        <Map />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { initializeGames, stayLoggedIn, changeLocation, changeColor })(App)
