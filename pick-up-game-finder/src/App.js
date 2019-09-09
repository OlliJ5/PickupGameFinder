import React, { useState, useEffect } from 'react'
import gameService from './services/games'

function App() {
  const [games, setGames] = useState([])

  useEffect(() => {
    gameService.getAll()
      .then(res => {
        setGames(res)
      })
  }, [])

  console.log('games', games)
  return (
    <div>
      <h1>Pick up game finder</h1>
      {games.map(game =>
        <h2 key={game.id}>
          {game.desc}
        </h2>)}
    </div>
  )
}

export default App
