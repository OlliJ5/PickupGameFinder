import axios from 'axios'

const baseUrl = '/api/players'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (game) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log('lähtetään', game)

  const response = await axios.post(baseUrl, game, config)
  return response.data
}

export default {
  setToken,
  create
}