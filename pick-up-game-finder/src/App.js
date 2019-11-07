import React, { useState, useEffect } from 'react'
import gameService from './services/games'
import playerService from './services/players'
import userService from './services/users'
import loginService from './services/login'
import Map from './components/Map'
import axios from 'axios'
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';
import NewGameForm from './components/NewGameForm';


const App = () => {
  const [games, setGames] = useState([])

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
    try {
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
    } catch (exception) {
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
    } catch (exception) {
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
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
        <CreateAccountForm createAccount={createAccount} newUsername={newUsername} newName={newName} newPassword={newPassword} setNewUsername={setNewUsername} setNewName={setNewName} setNewPassword={setNewPassword} />
      </div>
    )
  }
  return (
    <div>
      <NewGameForm createNewGame={createNewGame} duration={duration} desc={desc} maxParticipants={maxParticipants} setDuration={setDuration} setDesc={setDesc} setmaxParticipants={setmaxParticipants} />
      <Map games={games} location={location} />
    </div>
  )
}

export default App
