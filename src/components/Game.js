import React from 'react'
import { Marker } from 'react-map-gl'
import bball from '../bball.svg'

const Game = ({ game, setSelected, zoom }) => (
  <Marker
    latitude={game.location.lat}
    longitude={game.location.long}
  >
    <button style={{ border: '0', background: 'transparent' }}
      onClick={() => {setSelected(game); zoom(game.location.lat, game.location.long)}}
    >
      <img src={bball} alt='basketballgame here' style={{ height: '25px', width: '25px' }} />
    </button>
  </Marker>
)

export default Game