import React from 'react'
import GameInfo from './GameInfo'
import ClusterInfo from './ClusterInfo'

const MarkerInfo = ({ selectedCluster, prevSelected, setSelected, setPrevSelected, joinGame, supercluster, colorScheme }) => {
  if (selectedCluster.properties.cluster) {
    return (
      <ClusterInfo
        clusterInfo={selectedCluster}
        supercluster={supercluster}
        setSelected={setSelected}
        setPrevSelected={setPrevSelected}
        colorScheme={colorScheme}
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
        colorScheme={colorScheme}
      />
    )
  }
}

export default MarkerInfo