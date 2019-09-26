import React, { useState, useEffect } from 'react'
import gameService from './services/games'
import Map from './components/Map'
import { Button } from 'semantic-ui-react'


function App() {
  const initialUser = {
    lat: 0,
    lng: 0
  }
  const [games, setGames] = useState([])
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    gameService.getAllActive()
      .then(res => {
        setGames(res)
      })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newUser = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setUser(newUser)
    })
  }, [])

  return (
    <div>
      {games.map(game =>
        <h2 key={game.id}>
          {game.desc}
        </h2>)}
      <Button primary>Create a game</Button>
      <Map games={games} user={user} />
    </div>
  )
}

export default App
