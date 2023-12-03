const express = require("express");
const http = require('http');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;


const db = require("./app/models");
db.sequelize.sync();


const users = {};

io.on('connection', (socket) => {

  socket.on('register', userFirebaseUID => {
    users[userFirebaseUID] = socket.id;
  });

  socket.on('new-message', async (data) => {
    try {
      const { message } = data;

      await db.message.create({
        text: message.text,
        senderId: message.senderId,
        receiverId: message.receiverId,
      });

      const receiverSocketId = users[message.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('new-message', {
          text: message.text,
          senderId: message.senderId,
          receiverId: message.receiverId,
          time: message.time
        });
      }
    } catch (error) {
      console.error('Error saving message: ', error);
    }
  });

  socket.on('disconnect', () => {
    Object.keys(users).forEach(uid => {
      if (users[uid] === socket.id) {
        delete users[uid];
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`started on port: ${PORT}`);
});


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/user.routes")(app);
require("./app/routes/messages.routes")(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to code squad" });
});

// set port, listen for requests

/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); */