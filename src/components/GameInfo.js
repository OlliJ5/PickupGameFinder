import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

const GameInfo = ({ gameInfo, setSelected, joinGame }) => {
  const date = gameInfo.endTime.slice(0, 10)
  const time = gameInfo.endTime.slice(11, 16)
  return (
    <div className='gameInfo'>
      <Button
        size='mini'
        onClick={() => setSelected(null)}
        style={{ border: '0', background: 'transparent', position: 'absolute', top: '0px', right: '0px' }}
      >
        <Icon name='close' size='small' inverted />
      </Button>
      <Button
        primary
        onClick={() => joinGame(gameInfo.id)}
        style={{ margin: '20px', marginLeft: '0px' }}
      >
        Join
      </Button>
      <p style={{ paddingTop: '10px' }}>Description:</p>
      <p style={{ wordWrap: 'break-word' }}>{gameInfo.desc}</p>
      <p style={{ paddingTop: '10px' }}>
        Participants: ({gameInfo.participants.length}/{gameInfo.maxParticipants})
      </p>
      <List bulleted>
        {gameInfo.participants.map(participant =>
          <List.Item key={participant}>
            {participant}
          </List.Item>
        )}
      </List>
      <p style={{ paddingTop: '10px' }}>Game ends at: {date} {time} GMT</p>
    </div>
  )
}

export default GameInfo