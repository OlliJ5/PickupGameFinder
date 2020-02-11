import React from 'react'
import { Marker } from 'react-map-gl'

const Game = ({ game, setSelected }) => (
  <Marker
    latitude={game.location.lat}
    longitude={game.location.long}
  >
    <button style={{ border: '0', background: 'transparent' }} onClick={() => setSelected(game)}>
      <img src='/bball.svg' alt='basketballgame here' style={{ height: '25px', width: '25px' }} />
    </button>
  </Marker>
)

export default Game