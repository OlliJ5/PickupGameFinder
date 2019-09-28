import React, { useState, useEffect } from 'react'
import gameService from './services/games'
import Map from './components/Map'
import { Button } from 'semantic-ui-react'
import axios from 'axios'


function App() {
  const [games, setGames] = useState([])
  //const [user, setUser] = useState(null)
  const [location, setLocation] = useState(null)

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

  return (
    <div>
      {games.map(game =>
        <h2 key={game.id}>
          {game.desc}
        </h2>)}
      <Button primary>Create a game</Button>
      <Map games={games} location={location} />
    </div>
  )
}

export default App
