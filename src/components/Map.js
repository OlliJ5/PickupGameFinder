import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import playerService from '../services/players'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import useSupercluster from 'use-supercluster'
import Markers from './Markers'
import MarkerInfo from './MarkerInfo'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'
import NoLocation from './NoLocation'
import { toast } from 'react-toastify'
import { addPlayer } from '../reducers/gameReducer'


const Map = (props) => {
  const [viewport, setViewport] = useState({})
  const [selected, setSelected] = useState(null)

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
      <Markers clusters={clusters} zoom={zoom} />
      <NewGameForm />
      {selected && (
        <MarkerInfo
          selectedCluster={selected}
          setSelected={setSelected}
          joinGame={joinGame}
          supercluster={supercluster}
        />
      )}
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