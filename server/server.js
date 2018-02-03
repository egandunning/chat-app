const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');


const port = process.env.PORT || 3000;
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let connectionCount = 0;

app.use(express.static(path.join(__dirname, '../public')));

//register an event listener
io.on('connection', socket => {
   console.log('new user connected');
   connectionCount++;
   io.emit('connectionCountChanged', connectionCount);

   socket.emit('newMessage',
      generateMessage('Admin', 'Welcome to the chatroom!'));

   socket.broadcast.emit('newMessage',
      generateMessage('Admin', 'Someone joined the chatroom'));

   socket.on('createMessage', (data, callback) => {
      console.log('create message: ', data);

      //broadcast to everyone except socket
      socket.broadcast.emit('newMessage',
         generateMessage(data.from, data.text));

      callback('recieved message');

      //broadcast to all connected clients
      //io.emit('newMessage', data);
   });

   socket.on('disconnect', socket => {
      console.log('user disconnected');
      connectionCount--;
      io.emit('connectionCountChanged', connectionCount);
   });
});

server.listen(port, () => {
   console.log(`server started on port ${port}`)
});
