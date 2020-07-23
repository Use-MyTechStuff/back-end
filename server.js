const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const userRouter = require("./users/users-router")

const server = express()

server.use(helmet())
server.use(cors())

server.use(express.json())

server.use("/api/users", userRouter)
// server.use("/api/items" )
// server.use("api/techstuff", )

module.exports = server