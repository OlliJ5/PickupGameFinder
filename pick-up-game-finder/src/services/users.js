import axios from 'axios'

let baseUrl = ''

if(process.env.NODE_ENV === 'production') {
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/users'

const create = async (newUser) => {
  return await axios.post(`${baseUrl}${apiUrl}`, newUser)
}

export default {
  create
}