import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import gameReducer from './reducers/gameReducer'


const reducer = combineReducers({
  games: gameReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
