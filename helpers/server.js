const express = require('express')
const path = require('path')
const http = require('http')
const cors = require('cors')

// declare port
const PORT = process.env.PORT || 3000
// create express instance
const app = express();

// create server instance
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}\n`))
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({ credentials: true, origin: '*' }))