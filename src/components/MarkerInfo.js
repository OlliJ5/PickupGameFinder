import React from 'react'
import GameInfo from './GameInfo'
import ClusterInfo from './ClusterInfo'

const MarkerInfo = ({ selectedCluster, setSelected, joinGame, supercluster }) => {
  //console.log('klusteri', selectedCluster)
  if (selectedCluster.properties.cluster) {
    return (
      <ClusterInfo clusterInfo={selectedCluster} supercluster={supercluster} setSelected={setSelected} />
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