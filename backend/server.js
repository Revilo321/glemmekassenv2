const express = require('express')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const server = http.createServer(app)
const { Server } = require('socket.io')
require('dotenv').config();

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 8080

const db = require('./app/models');
db.sequelize.sync()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes/user.routes')(app)
require('./app/routes/messages.routes')(app)
require('./app/routes/items.routes')(app)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to code squad' })
})


//Socket for realtime chat
const users = {}
io.on('connection', (socket) => {
  socket.on('register', (userFirebaseUID) => {
    users[userFirebaseUID] = socket.id
  })

  socket.on('startTyping', (data) => {
    const receiverSocketId = users[data.receiverId];
    if(receiverSocketId){
      io.to(receiverSocketId).emit('userTyping', {senderId: data.senderId});
    }
  });

  socket.on('stopTyping', (data) => {
    const receiverSocketId = users[data.receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('userStoppedTyping', { senderId: data.senderId });
    }
  });

  socket.on('new-message', async (data) => {
    try {
      const { message } = data

      await db.message.create({
        text: message.text,
        senderId: message.senderId,
        receiverId: message.receiverId,
      })

      const receiverSocketId = users[message.receiverId]
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('new-message', {
          text: message.text,
          senderId: message.senderId,
          receiverId: message.receiverId,
          time: message.time,
        })
      }
    } catch (error) {
      console.error('Error saving message: ', error)
    }
  })

  socket.on('disconnect', () => {
    Object.keys(users).forEach((uid) => {
      if (users[uid] === socket.id) {
        delete users[uid]
      }
    })
  })
})

server.listen(PORT, () => {
  console.log(`started on port: ${PORT}`)
})
