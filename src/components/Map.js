import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import playerService from '../services/players'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import useSupercluster from 'use-supercluster'
import Game from './Game'
import GameInfo from './GameInfo'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'
import { Button, Container, Message, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { addPlayer } from '../reducers/gameReducer'


const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
    height: '100vh',
    width: '100vw'
  })
  const mapRef = useRef()

  const [selected, setSelected] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  useEffect(() => {
    setViewport({
      latitude: props.location === null ? 0 : props.location.lat,
      longitude: props.location === null ? 0 : props.location.lng,
      zoom: props.location === null ? 0 : 12,
      height: '100vh',
      width: '100vw'
    })
  }, [props.location])


  const joinGame = async (game) => {
    try {
      const response = await playerService.create({ game })
      toast.info('Joined the game successfully', {
        position: toast.POSITION.TOP_CENTER
      })
      props.addPlayer(response.user, response.game)

    } catch (exception) {
      toast.warn(exception.response.data.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const points = props.games.map(game => ({
    type: 'Feature',
    properties: {
      cluster: false,
      ...game
    },
    geometry: {
      type: 'Point',
      coordinates: [
        game.location.long,
        game.location.lat
      ]
    }
  }))

  const mapBounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: mapBounds,
    options: { radius: 100, maxZoom: 15 }
  })

  const zoomCluster = (id, latitude, longitude) => {
    console.log('zoomataan id', id)
    const zoomLevel = Math.min(supercluster.getClusterExpansionZoom(id), 15)

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: zoomLevel,
      transitionInterpolator: new FlyToInterpolator({
        speed: 1
      }),
      transitionDuration: 'auto'
    })
  }

  const zoomGame = (latitude, longitude) => {
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: 15,
      transitionInterpolator: new FlyToInterpolator({
        speed: 1
      }),
      transitionDuration: 'auto'
    })
  }

  console.log('klusterit', clusters)

  if (props.location === null) {
    return (
      <Container>
        <Message icon warning>
          <Icon name='location arrow' />
          <Message.Content>
            <Message.Header>Pls, give location</Message.Header>
            Please accept or deny the use of your location to continue using the app
          </Message.Content>
        </Message>
      </Container>
    )
  }

  return (
    <ReactMapGL
      maxZoom={15}
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/ogrousu/ck6g74as70kw51io8h0ceo6h3'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      onClick={() => setSelected(null)}
    >
      <Navigation />
      {formVisible && (
        <NewGameForm toggler={toggleVisibility} />
      )}
      {!formVisible && (
        <Button
          primary
          style={{ position: 'absolute', top: '50px', right: '10px' }}
          onClick={toggleVisibility}
        >
          New Game
        </Button>
      )}
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates

        if (cluster.properties.cluster) {
          return (
            <Marker
              key={cluster.id}
              latitude={latitude}
              longitude={longitude}>
              <div onClick={() => zoomCluster(cluster.id, latitude, longitude)} style={{ 'color': 'black', 'backgroundColor': '#cc5500', 'borderRadius': '50%', 'width': '25px', 'height': '25px', 'textAlign': 'center', 'lineHeight': '25px' }}>
                {cluster.properties.point_count}
              </div>
            </Marker>
          )
        }

        return (
          <Game
            key={cluster.properties.id}
            game={cluster.properties}
            setSelected={setSelected}
            zoom={zoomGame}
          />
        )
      })}
      {selected && (
        <GameInfo
          selectedGame={selected}
          setSelected={setSelected}
          joinGame={joinGame}
        />
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

export default connect(mapStateToProps, { addPlayer })(Map)