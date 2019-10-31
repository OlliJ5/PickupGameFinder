import React, { useState, useEffect } from 'react'
import gameService from './services/games'
import loginService from './services/login'
import Map from './components/Map'
import { Button } from 'semantic-ui-react'
import axios from 'axios'


const App = () => {
  const [games, setGames] = useState([])
  //const [user, setUser] = useState(null)
  const [location, setLocation] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      gameService.setToken(user.token)
      setPassword('')
      setUsername('')
    } catch (exception) {
      console.log('password or username incorrect')
      setPassword('')
      setUsername('')
    }
  }

  const ipLookUp = async () => {
    const res = await axios.get('http://ip-api.com/json')
    return res.data
  }

  useEffect(() => {
    gameService.getAllActive()
      .then(res => {
        setGames(res)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      gameService.setToken(user.token)
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

  if (user === null) {
    return (
      <div>
        <p>log in</p>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Button primary>Create a game</Button>
      <Map games={games} location={location} />
    </div>
  )
}

export default App
