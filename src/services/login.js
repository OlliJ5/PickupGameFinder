import axios from 'axios'

let baseUrl = ''

if(process.env.NODE_ENV === 'production') {
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}${apiUrl}`, credentials)
  return response.data
}

export default { login }