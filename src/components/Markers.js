import React from 'react'
import Game from './Game'
import { Marker } from 'react-map-gl'

const Markers = ({ clusters, zoom }) => {
  return (
    clusters.map(cluster => {
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
    })
  )
}

export default Markers