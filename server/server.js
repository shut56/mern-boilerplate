const express = require('express')
const http = require('http')
const io = require('socket.io')

require('dotenv').config()

const server = express()
const httpServer = http.createServer(server)
const socketIO = io(httpServer, {
  path: '/ws'
})

const PORT = process.env.PORT || 8080

server.use('/static', express.static(`${__dirname}/public`))

server.use(express.json({ limit: '50kb' }))
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from ${req.ip}`)
  next()
})

server.get('/', (req, res) => {
  res.send('Express server')
})

socketIO.on('connection', (socket) => {
  console.log(`Hello ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`Bye-bye ${socket.id}`)
  })
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
