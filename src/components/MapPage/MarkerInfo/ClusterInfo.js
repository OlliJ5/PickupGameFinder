import React from 'react'
import { Modal, Card } from 'semantic-ui-react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected, setPrevSelected, colorScheme }) => {
  const games = supercluster.getLeaves(clusterInfo.id)

  const style = {
    textColor: colorScheme === 'dark' ? 'white' : 'black',
    backgroundColor: colorScheme === 'dark' ? '#141d26' : '',
    cardColor: colorScheme === 'dark' ? '#1c2836' : ''
  }

  const close = () => {
    setPrevSelected(null)
    setSelected(null)
  }

  return (
    <Modal defaultOpen={true} onClose={close} closeOnDimmerClick={false} closeIcon>
      <Modal.Header style={{ backgroundColor: style.backgroundColor, color: style.textColor }}>Games in this location</Modal.Header>
      <Modal.Content style={{ backgroundColor: style.backgroundColor }}>
        {games.map((game, i) =>
          <Card style={{ backgroundColor: style.cardColor }} fluid onClick={() => { setPrevSelected(clusterInfo); setSelected(game) }} key={game.properties.id}>
            <Card.Content>
              <Card.Header style={{ color: style.textColor }}>
                Game {i}
              </Card.Header>
              <Card.Meta style={{ color: style.textColor }}>
                Created by {game.properties.owner.username}
              </Card.Meta>
              <Card.Description style={{ color: style.textColor }}>
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