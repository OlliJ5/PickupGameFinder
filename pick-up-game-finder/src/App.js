import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Map from './components/Map'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm'
import NewGameForm from './components/NewGameForm'
import { initializeGames } from './reducers/gameReducer'
import { stayLoggedIn } from './reducers/loginReducer'


const App = (props) => {
  const [location, setLocation] = useState(null)

  const ipLookUp = async () => {
    const res = await axios.get('http://ip-api.com/json')
    return res.data
  }

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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setLocation(userLocation)
      },
      (message) => {
        console.log('failed to get location', message)
        //do ip lookup here
        const response = ipLookUp()
        response.then(res => {
          const userLocation = {
            lat: res.lat,
            lng: res.lon
          }
          setLocation(userLocation)
        })
      })

    } else {
      console.log('geolocation not supported in this browser')
      //do ip lookup here also
      const response = ipLookUp()
      response.then(res => {
        const userLocation = {
          lat: res.lat,
          lng: res.lon
        }
        setLocation(userLocation)
      })
    }
  }, [])

  if (props.user === null) {
    return (
      <div>
        <LoginForm />
        <CreateAccountForm />
      </div>
    )
  }
  return (
    <div>
      <NewGameForm location={location} />
      <Map location={location} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeGames, stayLoggedIn })(App)
