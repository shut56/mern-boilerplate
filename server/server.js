const express = require('express')

const server = express()
const port = 8080

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

server.listen(port)

console.log(`Serving at http://localhost:${port}`)
