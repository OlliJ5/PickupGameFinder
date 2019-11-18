import React from 'react'
import { connect } from 'react-redux'
import playerService from '../services/players'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = (props) => {
  const joinGame = (game) => {
    playerService.create({ game })
  }

  return (
    <LeafletMap
      center={props.location === null ? [0, 0] : [props.location.lat, props.location.lng]}
      zoom={props.location === null ? 2 : 13}
      maxZoom={17}
      dragging={true}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {props.games.map(game =>
        <Marker key={game.id} position={[game.location.lat, game.location.long]}>
          <Popup>
            <button onClick={() => joinGame(game.id)}>Join game</button>
            {game.desc}
          </Popup>
        </Marker>
      )}
    </LeafletMap>
  )
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    location: state.location
  }
}

export default connect(mapStateToProps)(Map)