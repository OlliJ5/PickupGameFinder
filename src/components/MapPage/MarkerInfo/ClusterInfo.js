import React, { useState } from 'react'
import { Modal, Card } from 'semantic-ui-react'

const ClusterInfo = ({ clusterInfo, supercluster, setSelected, setPrevSelected, colorScheme }) => {
  const [modalOpen, setModalOpen] = useState(true)
  const games = supercluster.getLeaves(clusterInfo.id)

  const style = {
    textColor: colorScheme === 'dark' ? 'white' : 'black',
    backgroundColor: colorScheme === 'dark' ? '#192430' : '',
  }

  const close = () => {
    setModalOpen(false)
    setPrevSelected(null)
    setSelected(null)
  }

  return (
    <Modal open={modalOpen} onClose={close}>
      <Modal.Header style={{ backgroundColor: style.backgroundColor, color: style.textColor }}>Games in this location</Modal.Header>
      <Modal.Content style={{ backgroundColor: style.backgroundColor }}>
        {games.map((game, i) =>
          <Card style={{ backgroundColor: style.backgroundColor }} fluid onClick={() => { setPrevSelected(clusterInfo); setSelected(game) }} key={game.properties.id}>
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