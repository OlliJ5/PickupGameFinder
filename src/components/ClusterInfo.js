import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected }) => {
  const games = supercluster.getLeaves(clusterInfo.id)
  return (
    <div className='gameList' >
      <Button
        size='mini'
        onClick={() => setSelected(null)}
        style={{ border: '0', background: 'transparent', position: 'absolute', top: '0px', right: '0px' }}
      >
        <Icon name='close' size='small' inverted />
      </Button>
      <h2 style={{ color: 'white', padding: '12px' }}>Games</h2>
      {games.map(game =>
        <div onClick={() => setSelected(game)} className='gameListDiv' key={game.properties.id}>
          {game.properties.desc}
        </div>
      )}
    </div>
  )
}

export default ClusterInfo