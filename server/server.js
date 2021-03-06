const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const jsonParser = bodyParser.json();
let users = new Users();
let rooms = new Rooms();

app.use(express.static(path.join(__dirname, '../public')));

app.post('/login', jsonParser, (req, res) => {
   
   if(!req.body) {
      return res.status(400).send();
   }
   
   const displayName = req.body.displayName;
   const roomName = req.body.roomName;
   const password = req.body.password;

   //if display name and room name are nonempty strings and password is a
   //string, reject room join attempt and send informational message
   if(!(isRealString(displayName) &&
         isRealString(roomName) &&
         typeof password === 'string')) {
      return res.status(401).send({
         err: 'Display name and room name must not be blank'
      });
   }

   res.send(req.body);
});

//Called when a user connects to the server. All other event handlers are
//registered inside this function to keep track of connections.
io.on('connection', socket => {

   let sockId = socket.id;

   //Called when the user attempts to join the chat room.
   socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
         return callback('Display name and room name must not be blank');
      }

      /*let roomToJoin = rooms.addRoom(params.room, params.password);
      if(!canJoin(params.room, params.password, roomToJoin)) {
         return callback('Invalid room password');
      }*/

      socket.join(params.room);
      users.removeUser(sockId);
      users.addUser(sockId, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage',
         generateMessage('Admin', 'Welcome to the chatroom!'));

      socket.broadcast.to(params.room).emit('newMessage',
         generateMessage('Admin', `${params.name} joined the chatroom`));

      callback();
   });

   //Called when the current user leaves the chat room.
   socket.on('disconnect', socket => {
      let user = users.removeUser(sockId);

      if(user) {
         io.to(user.room).emit('newMessage',
            generateMessage('Admin', `${user.name} left the chatroom`));
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      }
   });

   //Called when the user sends a message. Sends the message to all users in the
   //room.
   socket.on('createMessage', (data, callback) => {
      console.log('create message: ', data);

      let user = users.getUser(sockId);

      socket.emit('newMessage',
         generateMessage(user.name, data.text));

      //broadcast to everyone except socket
      socket.broadcast.to(user.room).emit('newMessage',
         generateMessage(user.name, data.text));

      callback('recieved message');

      //broadcast to all connected clients
      //io.emit('newMessage', data);
   });
   
   //Called when the user sends their location. Sends the location to all users
   //in the room.
   socket.on('createLocationMessage', (data, callback) => {
      let user = users.getUser(sockId);

      socket.broadcast.to(user.room).emit('newLocationMessage',
         generateLocationMessage(user.name, data.lat, data.lng));

      socket.emit('newLocationMessage',
         generateLocationMessage(user.name, data.lat, data.lng));
   });
});

server.listen(port, () => {
   console.log(`server started on port ${port}`)
});
