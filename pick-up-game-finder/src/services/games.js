import axios from 'axios'

let token = null
let baseUrl = ''

if(process.env.NODE_ENV === 'production') {
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/games'

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllActive = async () => {
  const response = await axios.get(`${baseUrl}${apiUrl}/active`)
  return response.data
}

const create = async (newGame) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseUrl}${apiUrl}`, newGame, config)
  return response.data
}

export default {
  getAllActive,
  create,
  setToken
}