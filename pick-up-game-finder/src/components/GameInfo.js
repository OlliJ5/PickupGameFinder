import React from 'react'
import { Popup } from 'react-map-gl'
import { Button, List } from 'semantic-ui-react'

const GameInfo = ({ selectedGame, setSelected, joinGame }) => {
  const date = selectedGame.endTime.slice(0, 10)
  const time = selectedGame.endTime.slice(11, 16)
  return (
    <Popup
      latitude={selectedGame.location.lat}
      longitude={selectedGame.location.long}
      onClose={() => setSelected(null)}
      offsetLeft={18}
      offsetTop={-7}
    >
      Participants ({selectedGame.participants.length}/{selectedGame.maxParticipants})
      <Button onClick={() => joinGame(selectedGame.id)} style={{ marginLeft: '20px' }}>
        Join
      </Button>
      <List bulleted>
        {selectedGame.participants.map(participant =>
          <List.Item key={participant}>
            {participant}
          </List.Item>
        )}
      </List>
      <p>Game ends: {date} {time} GMT (....minutes left)</p>
      <p>{selectedGame.desc}</p>
    </Popup>
  )
}

export default GameInfo