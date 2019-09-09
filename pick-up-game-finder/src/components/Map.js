import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ games }) => {
  console.log('games', games)
  return (
    <LeafletMap
      center={[60, 15]}
      zoom={6}
      maxZoom={17}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
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