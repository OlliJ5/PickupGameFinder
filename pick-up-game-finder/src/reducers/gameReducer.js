import gameService from '../services/games'

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_GAMES':
      return action.data
    case 'ADD_GAME':
      return state.concat(action.data)
    case 'ADD_PLAYER': {
      const updatedGame = state.find(game => game.id === action.gameId)
      updatedGame.participants = updatedGame.participants.concat(action.userId)
      return state.map(game => game.id === action.gameId ? updatedGame : game)
    }
    default:
      return state
  }
}

export const initializeGames = () => {
  return async dispatch => {
    const games = await gameService.getAllActive()
    dispatch({
      type: 'INIT_GAMES',
      data: games
    })
  }
}

export const addPlayer = (userId, gameId) => {
  return {
    type: 'ADD_PLAYER',
    userId,
    gameId
  }
}

export const createGame = (game) => {
  return async dispatch => {
    try {
      const newGame = await gameService.create(game)
      dispatch({
        type: 'ADD_GAME',
        data: newGame
      })
    } catch (exception) {
      return exception.response
    }
  }
}

export default gameReducer