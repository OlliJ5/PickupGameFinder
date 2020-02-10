import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import playerService from '../services/players'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 3,
    height: '100vh',
    width: '100vw'
  })

  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setViewport({
      latitude: props.location === null ? 0 : props.location.lat,
      longitude: props.location === null ? 0 : props.location.lng,
      zoom: props.location === null ? 0 : 12,
      height: '100vh',
      width: '100vw'
    })
  }, [props.location])


  const joinGame = (game) => {
    console.log('täällä näin')
    playerService.create({ game })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/ogrousu/ck6g74as70kw51io8h0ceo6h3'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      onClick={() => setSelected(null)}
    >
      {props.games.map(game =>
        <Marker
          key={game.id}
          latitude={game.location.lat}
          longitude={game.location.long}
        >
          <button style={{ border: '0', background: 'transparent' }} onClick={() => setSelected(game)}>
            <img src='/bball.svg' alt='basketballgame here' style={{ height: '25px', width: '25px' }} />
          </button>
        </Marker>
      )}
      {selected && (
        <Popup
          latitude={selected.location.lat}
          longitude={selected.location.long}
          onClose={() => setSelected(null)}
          offsetLeft={18}
          offsetTop={-7}
        >
          <Button onClick={() => joinGame(selected.id)}>Join game</Button>
          {selected.desc}
        </Popup>
      )}
    </ReactMapGL>
  )
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    location: state.location
  }
}

export default connect(mapStateToProps)(Map)