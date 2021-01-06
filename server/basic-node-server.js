// Template for NodeJS Server
const http = require('http')

const port = 8080

http.createServer((req, res) => {
  switch (req.url) {
    case '/start': {
      res.write('This is START page')
    }
    case '/manager': {
      res.write('This is MANAGER page')
    }
    default: 
      res.statusCode = 403
  }
  res.end()
}).listen(port)

console.log(`Serving at http://localhost:${port}`)
