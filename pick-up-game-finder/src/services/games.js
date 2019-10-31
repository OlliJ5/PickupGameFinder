import axios from 'axios'

const baseUrl = '/api/games'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllActive = () => {
  const request = axios.get(`${baseUrl}/active`)
  return request.then(res => res.data)
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