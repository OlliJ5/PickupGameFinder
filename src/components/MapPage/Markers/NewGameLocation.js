import React from 'react'
import { Marker } from 'react-map-gl'
import { Icon } from 'semantic-ui-react'


const NewGameLocation = ({ location }) => (
  <Marker
    latitude={location.lat}
    longitude={location.lng}
  >
    <Icon
      name='map marker alternate'
      color='red'
      size='big'
    />
  </Marker>
)

export default NewGameLocation