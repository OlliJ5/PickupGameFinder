import React, { useState } from 'react'
import Map from './Map'
import Navigation from './Navigation'
import NewGameForm from './forms/NewGameForm'

const MapPage = () => {
  const [formVisible, setFormVisible] = useState(true)

  return (
    <div>
      <Navigation />
      <Map />
      {formVisible && (
        <NewGameForm />
      )}
    </div>
  )
}

export default MapPage