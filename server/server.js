import express from "express"
import cors from "cors"
import "dotenv/config"
import http from "http"
import { Server } from "socket.io"

// Create express app and HTTP server
const app = express()
const server = http.createServer(app)


// Initialize socket.io server
export const io = new Server(server, {
  cors: {origin: "*"}
})

// Store online users
export const userSocketMap = {} //{userId : socketId}

// socket connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);
  if(userId) userSocketMap[userId] = socket.id

  // emit online users  to all connected 
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})


// Middleware
app.use(cors())
app.use(express.json({limit: '40mb'}))
app.use(express.urlencoded({ extended: true }))

// Routes setup
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"

app.use("/api/status", (req, res) => res.send("Server is running"))
app.use("/api/auth",userRouter)
app.use("/api/messages", messageRouter)

// Connect to Database
import { connectDB } from "./lib/db.js"
connectDB()


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
