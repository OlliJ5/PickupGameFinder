import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ games, user }) => {
  console.log(user)
  return (
    <LeafletMap
      center={[user.lat, user.lng]}
      zoom={6}
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
            {game.desc}
          </Popup>
        </Marker>
      )}
    </LeafletMap>
  )
}

export default Map