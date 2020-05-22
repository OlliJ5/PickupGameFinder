import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import playerService from '../../services/players'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import useSupercluster from 'use-supercluster'
import Markers from './Markers/Markers'
import MarkerInfo from './MarkerInfo/MarkerInfo'
import Navigation from '../NavigationBar'
import NewGameForm from './NewGameForm'
import NewGameLocation from './Markers/NewGameLocation'
import NoLocation from './NoLocation'
import { toast } from 'react-toastify'
import { addPlayer } from '../../reducers/gameReducer'
import { Responsive, Grid, Button } from 'semantic-ui-react'

const Map = (props) => {
  const [viewport, setViewport] = useState({})
  const [selected, setSelected] = useState(null)
  const [prevSelected, setPrevSelected] = useState(null)
  const [latestClick, setLatestClick] = useState({ lat: 0, lng: 0 })
  const [formVisible, setFormVisible] = useState(false)
  const [newGameLocation, setNewGameLocation] = useState({ lat: 0, lng: 0 })
  const [radioValue, setRadioValue] = useState('curr')

  const mapStyle = props.colorScheme === 'dark' ? 'mapbox://styles/ogrousu/ck6g74as70kw51io8h0ceo6h3' : 'mapbox://styles/ogrousu/ckae1dzbv0fvc1ilbhpvgy23t'

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
    options: { radius: 30, maxZoom: 15 }
  })

  const joinGame = async (game) => {
    try {
      const response = await playerService.create({ game })
      toast.info('Joined the game successfully', {
        position: toast.POSITION.TOP_CENTER
      })
      props.addPlayer(response.user, response.game)

      const updatedParticipants = selected.properties.participants.concat(response.user)
      const updatedProperties = { ...selected.properties, participants: updatedParticipants }
      const updatedSelected = {
        geometry: selected.geometry,
        properties: updatedProperties,
        type: selected.type
      }
      setSelected(updatedSelected)
    } catch (exception) {
      toast.warn(exception.response.data.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const zoom = (cluster) => {
    //if no id, we are zooming fully to a single game, otherwise we are zooming
    //until the cluster would break into multiple games or full zoom if they are too close to separate
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

  const mapClick = (click) => {
    if (radioValue === 'select' && formVisible) {
      setLatestClick({ lat: click.lngLat[1], lng: click.lngLat[0] })
    }
  }

  const getCursorStyle = ({ isDragging }) => {
    if (radioValue === 'select' && formVisible) {
      return 'crosshair'
    }
    return isDragging ? 'grabbing' : 'grab'
  }

  const openForm = () => {
    if (window.screen.width > 767) {
      setFormVisible(true)
    } else {
      setFormVisible(true)
      setViewport({ ...viewport, height: '50vh' })
    }
  }

  if (props.location === null) {
    return (
      <NoLocation />
    )
  }

  return (
    <div>
      {!formVisible && (
        <Button
          primary
          style={{ position: 'absolute', top: '50px', right: '10px', zIndex: '9' }}
          onClick={openForm}
        >
          New Game
        </Button>
      )
      }
      {formVisible && (
        <div>
          <Responsive minWidth={768}>
            <Grid style={{ position: 'absolute', top: '0', right: '0', marginTop: '35px', marginRight: '10px', zIndex: '9' }}>
              <Grid.Column>
                <NewGameForm
                  latestClick={latestClick}
                  setLatestClick={setLatestClick}
                  setFormVisible={setFormVisible}
                  newGameLocation={newGameLocation}
                  setNewGameLocation={setNewGameLocation}
                  radioValue={radioValue}
                  setRadioValue={setRadioValue}
                />
              </Grid.Column>
            </Grid>
          </Responsive>

          <Responsive maxWidth={767}>
            <div style={{ position: 'fixed', bottom: '0', width: '100%', maxHeight: '50vh', overflow: 'auto', zIndex: '9' }}>
              <NewGameForm
                latestClick={latestClick}
                setLatestClick={setLatestClick}
                setFormVisible={setFormVisible}
                newGameLocation={newGameLocation}
                setNewGameLocation={setNewGameLocation}
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                viewport={viewport}
                setViewport={setViewport}
              />
            </div>
          </Responsive>
        </div>
      )}

      <ReactMapGL
        getCursor={getCursorStyle}
        maxZoom={15}
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        onClick={mapClick}
      >
        <Navigation />
        {formVisible && (
          <NewGameLocation location={newGameLocation} />
        )}
        <Markers clusters={clusters} zoom={zoom} />
        {selected && (
          <MarkerInfo
            selectedCluster={selected}
            prevSelected={prevSelected}
            setSelected={setSelected}
            setPrevSelected={setPrevSelected}
            joinGame={joinGame}
            supercluster={supercluster}
            colorScheme={props.colorScheme}
          />
        )}
      </ReactMapGL>
    </div >
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
    location: state.location,
    colorScheme: state.colorScheme
  }
}

export default connect(mapStateToProps, { addPlayer })(Map)