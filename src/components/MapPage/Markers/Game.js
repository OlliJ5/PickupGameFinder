import React from 'react'
import { Marker } from 'react-map-gl'
import bball from '../../../resources/bball.svg'

const Game = ({ cluster, zoom }) => {
  const game = cluster.properties
  return (

    <Marker
      latitude={game.location.lat}
      longitude={game.location.long}
    >
      <div onClick={() => { zoom(cluster) }} id='game'>
        <img src={bball} alt='basketballgame here' style={{ height: '25px', width: '25px' }} />
      </div>
    </Marker>
  )
}

export default Game