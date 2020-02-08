import axios from 'axios'

let baseUrl = ''

console.log('envi', process.env.NODE_ENV)

if(process.env.NODE_ENV === 'production') {
  console.log('mentiin tänne')
  baseUrl = 'https://pickupgamefinder.herokuapp.com'
}

const apiUrl = '/api/users'

const create = async (newUser) => {
  return await axios.post(`${baseUrl}${apiUrl}`, newUser)
}

export default {
  create
}