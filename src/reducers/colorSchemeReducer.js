const colorSchemeReducer = (state = 'light', action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return action.colorScheme
    default:
      return state
  }
}

export const changeColor = (colorScheme) => {
  window.localStorage.setItem('colorScheme', colorScheme)
  return {
    type: 'CHANGE_COLOR',
    colorScheme
  }
}

export default colorSchemeReducer