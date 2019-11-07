import axios from 'axios'

const baseUrl = '/api/games'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllActive = async () => {
  const response = await axios.get(`${baseUrl}/active`)
  return response.data
}

const create = async (newGame) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newGame, config)
  return response.data
}

export default {
  getAllActive,
  create,
  setToken
}