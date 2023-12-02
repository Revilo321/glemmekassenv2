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
  console.log('a user connected');

  // Store the user's Firebase UID and their socket ID
  socket.on('register', userFirebaseUID => {
    users[userFirebaseUID] = socket.id;
    console.log(users);
  });

  socket.on('new-message', async (data) => {
    console.log(data)
    try {
      const { message, senderId, receiverId } = data;

      // Save the message to the database
      const newMessage = await db.message.create({
        text: message,
        senderId: senderId,
        receiverId: receiverId,
      });

      // Emit the message to the specific receiver if they are online
      console.log("users",users)
      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        console.log("receiver socket",receiverSocketId, newMessage)
        io.to(receiverSocketId).emit('new-message', newMessage);
      }
    } catch (error) {
      console.error('Error saving message: ', error);
    }
  });

  socket.on('disconnect', () => {
    // Remove the user's Firebase UID from the users object
    Object.keys(users).forEach(uid => {
      if (users[uid] === socket.id) {
        delete users[uid];
      }
    });
    console.log('user disconnected');
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
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to code squad" });
});

// set port, listen for requests

/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); */