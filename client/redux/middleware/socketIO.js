import { io } from 'socket.io-client'

const socketIOMiddleware = () => {
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, {
      path: '/ws'
    })

    const { dispatch, getState } = store
    console.log('Store?', !!dispatch, !!getState)

    socket.on('SOCKET_IO', (message) => {
      switch (message.type) {
        case 'message:get': {
          console.log(message.payload)
          break
        }
        default: {
          console.log('Server Message Received')
        }
      }
    })

    return (next) => (action) => {
      switch (action.type) {
        case 'message:add': {
          socket.emit(action.type, action.payload)
          break
        }
        default: {
          return next(action)
        }
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
