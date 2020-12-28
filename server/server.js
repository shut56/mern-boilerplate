import express from 'express'
import http from 'http'
import io from 'socket.io'

import config from './config'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

server.use('/static', express.static(`${__dirname}/public`))

server.use(express.json({ limit: '50kb' }))
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from ${req.ip}`)
  next()
})

server.get('/', (req, res) => {
  res.send('Express server')
})

if (config.socketsEnabled) {
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`Hello ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
    })
  })
}

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
