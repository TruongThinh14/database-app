require("./Category").connect();
require("./configDb").setupDb();
const express = require("express")
const http = require("http")
const cors = require('cors')
const app = express()
const port = 2222

const route = require('./routes/Index');

app.use(cors({origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], credentials: true}))

route(app)

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

