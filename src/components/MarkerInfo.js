import React from 'react'
import GameInfo from './GameInfo'
import ClusterInfo from './ClusterInfo'

const MarkerInfo = ({ selectedCluster, prevSelected, setSelected, setPrevSelected, joinGame, supercluster }) => {
  //console.log('edellinen', prevSelected)
  //console.log('nyt', selectedCluster)
  if (selectedCluster.properties.cluster) {
    return (
      <ClusterInfo
        clusterInfo={selectedCluster}
        supercluster={supercluster}
        setSelected={setSelected}
        setPrevSelected={setPrevSelected}
      />
    )
  } else {
    return (
      <GameInfo
        gameInfo={selectedCluster.properties}
        setSelected={setSelected}
        prevSelected={prevSelected}
        setPrevSelected={setPrevSelected}
        joinGame={joinGame}
      />
    )
  }
}

export default MarkerInfo