import React from 'react'
import GameInfo from './GameInfo'

const MarkerInfo = ({ selectedCluster, setSelected, joinGame }) => {
  if (selectedCluster.properties.cluster) {
    return (
      <></>
    )
  } else {
    return (
      <GameInfo
        gameInfo={selectedCluster.properties}
        setSelected={setSelected}
        joinGame={joinGame}
      />
    )
  }
}

export default MarkerInfo