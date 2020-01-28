import axios from 'axios'

const baseUrl = '/api/users'

const create = async (newUser) => {
  return await axios.post(baseUrl, newUser)
}

export default {
  create
}