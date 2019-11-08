import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../reducers/gameReducer'

const NewGameForm = (props) => {
  const [duration, setDuration] = useState(1)
  const [desc, setDesc] = useState('')
  const [maxParticipants, setmaxParticipants] = useState(10)

  const createNewGame = async (event) => {
    event.preventDefault()
    const newGame = {
      durationMins: duration,
      location: props.location,
      desc,
      maxParticipants
    }

    props.createGame(newGame)
    setDuration(30)
    setDesc('')
    setmaxParticipants(10)
  }

  return (
    <div>
      <p>start a new game</p>
      <form onSubmit={createNewGame}>
        <div>
          duration (in minutes)
          <input
            type="number"
            value={duration}
            name="duration"
            onChange={({ target }) => setDuration(target.value)}
          />
        </div>
        <div>
          description for your game
          <input
            type="text"
            value={desc}
            name="desc"
            onChange={({ target }) => setDesc(target.value)}
          />
        </div>
        <div>
          maximum amount of participants
          <input
            type="number"
            value={maxParticipants}
            name="maxParticipants"
            onChange={({ target }) => setmaxParticipants(target.value)}
          />
        </div>
        <button type="submit">create game</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps, { createGame })(NewGameForm)