const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

//register an event listener
io.on('connection', socket => {

   let sockId = socket.id;

   socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
         return callback('Display name and room name must not be blank');
      }

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

   socket.on('disconnect', socket => {
      let user = users.removeUser(sockId);

      if(user) {
         io.to(user.room).emit('newMessage',
            generateMessage('Admin', `${user.name} left the chatroom`));
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      }
   });

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
