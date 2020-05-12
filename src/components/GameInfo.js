import React from 'react'
import { Modal, Icon, Header, List, Divider, Button } from 'semantic-ui-react'

const GameInfo = ({ gameInfo, setSelected, prevSelected, setPrevSelected, joinGame }) => {

  const goBack = () => {
    setSelected(prevSelected)
  }

  const close = () => {
    setPrevSelected(null)
    setSelected(null)
  }

  const showPrevIcon = prevSelected !== null ? true : false

  //console.log('info', gameInfo)
  const date = gameInfo.endTime.slice(0, 10)
  const time = gameInfo.endTime.slice(11, 16)
  return (
    <Modal defaultOpen={true} onClose={close} closeOnDimmerClick={false} closeIcon>
      <Modal.Header>
        {showPrevIcon && (
          <Icon link name='arrow left' onClick={goBack} />
        )}
      </Modal.Header>
      <Modal.Content>
        <Button floated='right' primary onClick={() => joinGame(gameInfo.id)}>
          Join
        </Button>
        <Modal.Description>
          <Header>Game by {gameInfo.owner}</Header>
          <p>{gameInfo.desc}</p>
          <p>Participants: ({gameInfo.participants.length}/{gameInfo.maxParticipants})</p>
          <List bulleted>
            {gameInfo.participants.map(participant =>
              <List.Item key={participant}>
                {participant}
              </List.Item>
            )}
          </List>
          <Divider />
          <p>Game ends at: {date} {time} GMT</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default GameInfo