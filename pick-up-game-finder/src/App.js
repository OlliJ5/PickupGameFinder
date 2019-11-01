import React, { useState, useEffect } from 'react'
import gameService from './services/games'
import playerService from './services/players'
import userService from './services/users'
import loginService from './services/login'
import Map from './components/Map'
import axios from 'axios'


const App = () => {
  const [games, setGames] = useState([])
  //const [user, setUser] = useState(null)
  const [location, setLocation] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [duration, setDuration] = useState(1)
  const [desc, setDesc] = useState('')
  const [maxParticipants, setmaxParticipants] = useState(10)

  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      gameService.setToken(user.token)
      playerService.setToken(user.token)
      setPassword('')
      setUsername('')
    } catch (exception) {
      console.log('password or username incorrect')
      setPassword('')
      setUsername('')
    }
  }

  const createNewGame = async (event) => {
    event.preventDefault()
    try{
      const newGame = {
        durationMins: duration,
        location: location,
        desc,
        maxParticipants
      }
      const game = await gameService.create(newGame)

      setGames(games.concat(game))
      setDuration(30)
      setDesc('')
      setmaxParticipants(10)
    }catch(exception) {
      console.log('something went wrong')
    }
  }

  const createAccount = async (event) => {
    event.preventDefault()
    try {
      const newUser = {
        username: newUsername,
        name: newName,
        password: newPassword
      }
      const user = await userService.create(newUser)
      console.log('luotiin', user)
      setNewUsername('')
      setNewName('')
      setNewPassword('')
    } catch(exception) {
      console.log('something went wrong')
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

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      gameService.setToken(user.token)
      playerService.setToken(user.token)
      setUser(user)
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
        <p>or create an account</p>
        <form onSubmit={createAccount}>
          <div>
          username
            <input
              type="text"
              value={newUsername}
              name="newUsername"
              onChange={({ target }) => setNewUsername(target.value)}
            />
          </div>
          <div>
            name
            <input
              type="text"
              value={newName}
              name="name"
              onChange={({ target }) => setNewName(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={newPassword}
              name="newPassword"
              onChange={({ target }) => setNewPassword(target.value)}
            />
          </div>
          <button type="submit">create an account</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <div>
        <p>start a new game</p>
        <form onSubmit={createNewGame}>
          <div>
            duration (in minutes)
            <input
              type="number"
              value={duration}
              name="duration"
              onChange={({ target }) => setDuration(target.value)}
            />
          </div>
          <div>
            description for your game
            <input
              type="text"
              value={desc}
              name="desc"
              onChange={({ target }) => setDesc(target.value)}
            />
          </div>
          <div>
            maximum amount of participants
            <input
              type="number"
              value={maxParticipants}
              name="maxParticipants"
              onChange={({ target }) => setmaxParticipants(target.value)}
            />
          </div>
          <button type="submit">create game</button>
        </form>
      </div>
      <Map games={games} location={location} />
    </div>
  )
}

export default App
