import gameService from '../services/games'

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_GAMES':
      return action.data
    case 'ADD_GAME':
      return state.concat(action.data)
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

export const createGame = (game) => {
  return async dispatch => {
    const newGame = await gameService.create(game)
    dispatch({
      type: 'ADD_GAME',
      data: newGame
    })
  }
}

export default gameReducer