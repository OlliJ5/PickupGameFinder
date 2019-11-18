import React, { useState } from 'react'
import Map from './Map'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'
import { Button } from 'semantic-ui-react'

const MapPage = () => {
  const [formVisible, setFormVisible] = useState(false)

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  return (
    <div>
      <Navigation />
      <Map />
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
    </div>
  )
}

export default MapPage