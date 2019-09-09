import axios from 'axios'

const baseUrl = '/api/games'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

export default {
  getAll
}