import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import playerService from '../services/players'
import ReactMapGL from 'react-map-gl'
import Game from './Game'
import GameInfo from './GameInfo'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'
import { Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'


const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 3,
    height: '100vh',
    width: '100vw'
  })

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
      await playerService.create({ game })
      toast.info('Joined the game successfully', {
        position: toast.POSITION.TOP_CENTER
      })
      setSelected(null)
    } catch(exception) {
      toast.warn(exception.response.data.error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
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
      <Navigation />
      {formVisible && (
        <NewGameForm toggler={toggleVisibility} />
      )}
      {!formVisible && (
        <Button
          primary
          style={{ position: 'absolute', top: '50px', right: '10px', zIndex: '999' }}
          onClick={toggleVisibility}
        >
          New Game
        </Button>
      )}
      {props.games.map(game => (
        <Game
          key={game.id}
          game={game}
          setSelected={setSelected}
        />
      ))}
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

export default connect(mapStateToProps)(Map)