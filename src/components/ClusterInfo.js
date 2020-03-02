import React from 'react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected }) => {
  const games = supercluster.getLeaves(clusterInfo.id)
  console.log('lehdet', supercluster.getLeaves(clusterInfo.id))
  return (
    <div className='gameList' >
      {games.map(game =>
        <div onClick={() => setSelected(game)} className='gameListDiv' key={game.properties.id}>
          {game.properties.desc}
        </div>
      )}
    </div>
  )
}

export default ClusterInfo