import express from 'express'
import http from 'http'
import io from 'socket.io'
import mongoose from 'mongoose'

import config from './config'
import { userModel } from './mongodb/models'

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

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  server.post('/api/v1/user', (req, res) => {
    const newUser = req.body
    userModel.create(newUser)
    res.send('User added')
  })
}

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
