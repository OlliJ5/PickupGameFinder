import React, { useState } from 'react'
import { Modal, Icon, Header, List, Divider, Button } from 'semantic-ui-react'

const GameInfo = ({ gameInfo, setSelected, prevSelected, setPrevSelected, joinGame, colorScheme }) => {
  const [modalOpen, setModalOpen] = useState(true)

  const style = {
    textColor: colorScheme === 'dark' ? 'white' : 'black',
    backgroundColor: colorScheme === 'dark' ? '#141d26' : '',
    inverted: colorScheme === 'dark'
  }

  const showPrevIcon = prevSelected !== null ? true : false
  const date = gameInfo.endTime.slice(0, 10)
  const time = gameInfo.endTime.slice(11, 16)

  const goBack = () => {
    setSelected(prevSelected)
  }

  const close = () => {
    setModalOpen(false)
    setPrevSelected(null)
    setSelected(null)
  }

  return (
    <Modal open={modalOpen} onClose={close}>
      <Modal.Header style={{ backgroundColor: style.backgroundColor }}>
        {showPrevIcon && (
          <Icon inverted={style.inverted} link name='arrow left' onClick={goBack} />
        )}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: style.backgroundColor }}>
        <Button floated='right' primary onClick={() => joinGame(gameInfo.id)}>
          Join
        </Button>
        <Modal.Description>
          <Header style={{ color: style.textColor }}>Game by {gameInfo.owner.username}</Header>
          <p style={{ color: style.textColor }}>{gameInfo.desc}</p>
          <p style={{ color: style.textColor }}>Participants: ({gameInfo.participants.length}/{gameInfo.maxParticipants})</p>
          <List bulleted>
            {gameInfo.participants.map(participant =>
              <List.Item key={participant.id} style={{ color: style.textColor }}>
                {participant.username}
              </List.Item>
            )}
          </List>
          <Divider />
          <p style={{ color: style.textColor }}>Game ends at: {date} {time} GMT</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default GameInfo