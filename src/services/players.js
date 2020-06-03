import axios from 'axios'

let token = null
let baseUrl = ''

if(process.env.NODE_ENV === 'production') {
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/players'


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (game) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseUrl}${apiUrl}`, game, config)
  return response.data
}

const getByUser = async(id) => {
  const response = await axios.get(`${baseUrl}${apiUrl}/user/${id}`)
  return response.data
}

export default {
  setToken,
  create,
  getByUser
}