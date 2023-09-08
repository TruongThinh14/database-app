const express = require("express")
const http = require("http")
const app = express()
const port = 2222
require("./configDb").setupDb()
const route = require('./routes/Index');

route(app)

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

