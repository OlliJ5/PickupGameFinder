import React from 'react'
import { Popup } from 'react-map-gl'
import { Button, List } from 'semantic-ui-react'

const GameInfo = ({ gameInfo, setSelected, joinGame }) => {
  const date = gameInfo.endTime.slice(0, 10)
  const time = gameInfo.endTime.slice(11, 16)
  return (
    <Popup
      latitude={gameInfo.location.lat}
      longitude={gameInfo.location.long}
      onClose={() => setSelected(null)}
      offsetLeft={18}
      offsetTop={-7}
    >
      Participants ({gameInfo.participants.length}/{gameInfo.maxParticipants})
      <Button onClick={() => joinGame(gameInfo.id)} style={{ marginLeft: '20px' }}>
        Join
      </Button>
      <List bulleted>
        {gameInfo.participants.map(participant =>
          <List.Item key={participant}>
            {participant}
          </List.Item>
        )}
      </List>
      <p>Game ends: {date} {time} GMT (....minutes left)</p>
      <p>{gameInfo.desc}</p>
    </Popup>
  )
}

export default GameInfo