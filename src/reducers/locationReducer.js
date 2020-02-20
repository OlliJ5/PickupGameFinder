import axios from 'axios'

const locationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return action.location
    default:
      return state
  }
}

const ipLookUp = async () => {
  const res = await axios.get('http://ip-api.com/json')
  return res.data
}

export const changeLocation = () => {
  return async dispatch => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        dispatch({
          type: 'CHANGE_LOCATION',
          location: userLocation
        })
      },
      (message) => {
        console.log('failed to get location', message)
        const response = ipLookUp()
        response.then(res => {
          const userLocation = {
            lat: res.lat,
            lng: res.lon
          }
          dispatch({
            type: 'CHANGE_LOCATION',
            location: userLocation
          })
        })
      })

    } else {
      console.log('geolocation not supported in this browser')
      const response = ipLookUp()
      response.then(res => {
        const userLocation = {
          lat: res.lat,
          lng: res.lon
        }
        dispatch({
          type: 'CHANGE_LOCATION',
          location: userLocation
        })
      })
    }
  }
}

export default locationReducer