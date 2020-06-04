import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import gameReducer from './reducers/gameReducer'
import userReducer from './reducers/userReducer'
import locationReducer from './reducers/locationReducer'
import colorSchemeReducer from './reducers/colorSchemeReducer'

// used colors:
// darkest: #1c2836
// mid: #192430
// lightest: #243447

const reducer = combineReducers({
  games: gameReducer,
  user: userReducer,
  location: locationReducer,
  colorScheme: colorSchemeReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
