const express = require('express')
require('dotenv').config()

const server = express()
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

server.get('/manager', (req, res) => {
  res.send('This is MANAGER page')
})

server.post('/users', (req, res) => {
  const user = {
    name: req.body.name,
    age: req.body.age,
    time: new Date()
  }
  res.json(user)
})

server.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
