import React from 'react'

const NewGameForm = ({ createNewGame, duration, desc, maxParticipants, setDuration, setDesc, setmaxParticipants }) => {
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

export default NewGameForm