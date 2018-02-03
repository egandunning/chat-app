const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

//register an event listener
io.on('connection', socket => {
   console.log('new user connected');

   socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chatroom!',
      createdAt: Date.now()
   });

   socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'Someone joined the chatroom',
      createdAt: Date.now()
   });

   socket.on('createMessage', data => {
      console.log('create message: ', data);

      //broadcast to everyone except socket
      socket.broadcast.emit('newMessage', {
         from: data.from,
         text: data.text,
         createdAt: Date.now()
      });

      //broadcast to all connected clients
      //io.emit('newMessage', data);
   });

   socket.emit('newMessage', {
      from: 'ted',
      text: 'hey dude, whats up?',
      createdAt: Date.now()
   });

   socket.on('disconnect', socket => {
      console.log('user disconnected');
   });
});

server.listen(port, () => {
   console.log(`server started on port ${port}`)
});
