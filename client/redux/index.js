import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { io } from 'socket.io-client'

import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middleware))

const store = createStore(rootReducer(), initialState, composedEnhancers)

if (SOCKETS_ENABLE || false) {
  // eslint-disable-next-line
  const socket = io(`${window.location.origin}`, {
    path: '/ws'
  })
}

export default store
