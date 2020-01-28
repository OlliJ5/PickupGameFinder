import loginService from '../services/login'
import gameService from '../services/games'
import playerService from '../services/players'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'STAY_LOGGED_IN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      gameService.setToken(user.token)
      playerService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (exception) {
      return exception.response
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const stayLoggedIn = (user) => {
  return async dispatch => {
    gameService.setToken(user.token)
    playerService.setToken(user.token)
    dispatch({
      type: 'STAY_LOGGED_IN',
      user
    })
  }
}

export default loginReducer