

const locationReducer = (state = null, action) => {
  console.log('actioni', action)
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return action.location
    default:
      return state
  }
}

export const changeLocation = (location) => {
  return {
    type: 'CHANGE_LOCATION',
    location
  }
}

export default locationReducer