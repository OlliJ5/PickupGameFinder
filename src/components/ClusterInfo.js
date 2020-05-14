import React from 'react'
import { Modal, Card } from 'semantic-ui-react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected, setPrevSelected }) => {
  const games = supercluster.getLeaves(clusterInfo.id)

  const close = () => {
    setPrevSelected(null)
    setSelected(null)
  }

  return (
    <Modal defaultOpen={true} onClose={close} closeOnDimmerClick={false} closeIcon>
      <Modal.Header>Games in this location</Modal.Header>
      <Modal.Content>
        {games.map((game, i) =>
          <Card fluid onClick={() => { setPrevSelected(clusterInfo); setSelected(game) }} key={game.properties.id}>
            <Card.Content>
              <Card.Header>
                Game {i}
              </Card.Header>
              <Card.Meta>
                Created by {game.properties.owner.username}
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