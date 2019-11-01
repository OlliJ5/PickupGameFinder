import React from 'react'
import playerService from '../services/players'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ games, location }) => {

  const joinGame = (game) => {
    console.log('painettu', game)
    playerService.create({ game })
  }

  return (
    <LeafletMap
      center={location === null ? [0, 0] : [location.lat, location.lng]}
      zoom={location === null ? 2 : 13}
      maxZoom={17}
      dragging={true}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {games.map(game =>
        <Marker key={game.id} position={[game.location.lat, game.location.long]}>
          <Popup>
            <button onClick={() => joinGame(game.id)}>liity peliin</button>
            {game.desc}
          </Popup>
        </Marker>
      )}
    </LeafletMap>
  )
}

export default Map