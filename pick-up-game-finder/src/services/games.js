import axios from 'axios'

const baseUrl = '/api/games'

const getAllActive = () => {
  const request = axios.get(`${baseUrl}/active`)
  return request.then(res => res.data)
}

export default {
  getAllActive
}