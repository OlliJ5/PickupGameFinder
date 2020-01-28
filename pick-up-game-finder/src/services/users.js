import axios from 'axios'

const baseUrl = '/api/users'

const create = async (newUser) => {
  // try {
  //   const response =  await axios.post(baseUrl, newUser)
  //   return response
  // } catch(exception) {
  //   console.log('rippistä', exception.response.data)
  // }
  return await axios.post(baseUrl, newUser)
  //return response.data
}

export default {
  create
}