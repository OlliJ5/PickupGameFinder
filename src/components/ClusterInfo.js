import React from 'react'
import { Modal, Card } from 'semantic-ui-react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected }) => {
  const games = supercluster.getLeaves(clusterInfo.id)
  console.log('pelit', games)
  return (
    <Modal open={true}>
      <Modal.Header>Games in this location</Modal.Header>
      <Modal.Content>
        {games.map((game, i) =>
          <Card fluid onClick={() => setSelected(game)} key={game.properties.id}>
            <Card.Content>
              <Card.Header>
                Game {i}
              </Card.Header>
              <Card.Meta>
                Created by {game.owner}
              </Card.Meta>
              <Card.Description>
                {game.properties.desc}
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default ClusterInfo