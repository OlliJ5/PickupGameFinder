import axios from 'axios'

let token = null
let baseUrl = ''

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/users'

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newUser) => {
  return await axios.post(`${baseUrl}${apiUrl}`, newUser)
}

const update = async (updatedUser) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}${apiUrl}/${updatedUser.id}`, updatedUser, config)
  return response.data
}

export default {
  create,
  update,
  setToken
}