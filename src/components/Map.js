import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import playerService from '../services/players'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import useSupercluster from 'use-supercluster'
import Game from './Game'
import GameInfo from './GameInfo'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'
import NoLocation from './NoLocation'
import { Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { addPlayer } from '../reducers/gameReducer'


const Map = (props) => {
  const [viewport, setViewport] = useState({})
  const [selected, setSelected] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    //after user location is fetched, we initialize the map
    setViewport({
      latitude: props.location === null ? 0 : props.location.lat,
      longitude: props.location === null ? 0 : props.location.lng,
      zoom: props.location === null ? 0 : 12,
      height: '100vh',
      width: '100vw'
    })
  }, [props.location])

  //boundaries of map for supercluster
  const mapRef = useRef()
  const mapBounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null

  //get game clusters from supercluster
  const { clusters, supercluster } = useSupercluster({
    points: props.points,
    zoom: viewport.zoom,
    bounds: mapBounds,
    options: { radius: 100, maxZoom: 15 }
  })

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

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


  const zoom = (cluster) => {
    //if no id, we are zooming to a single game
    const zoomLevel = !cluster.id ? 15 : Math.min(supercluster.getClusterExpansionZoom(cluster.id), 15)
    const [longitude, latitude] = cluster.geometry.coordinates
    setSelected(cluster)

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

  if (props.location === null) {
    return (
      <NoLocation />
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
          //console.log('klusteri', cluster)
          return (
            <Marker
              key={cluster.id}
              latitude={latitude}
              longitude={longitude}>
              <div onClick={() => zoom(cluster)} style={{ 'color': 'black', 'backgroundColor': '#cc5500', 'borderRadius': '50%', 'width': '25px', 'height': '25px', 'textAlign': 'center', 'lineHeight': '25px' }}>
                {cluster.properties.point_count}
              </div>
            </Marker>
          )
        }

        return (
          <Game
            key={cluster.properties.id}
            cluster={cluster}
            zoom={zoom}
          />
        )
      })}
      {/* {selected && (
        <GameInfo
          selectedGame={selected}
          setSelected={setSelected}
          joinGame={joinGame}
        />
      )} */}
    </ReactMapGL>
  )
}

const mapStateToProps = (state) => {
  //modify game data to GeoJSON for supercluster
  const points = state.games.map(game => ({
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

  return {
    points,
    location: state.location
  }
}

export default connect(mapStateToProps, { addPlayer })(Map)