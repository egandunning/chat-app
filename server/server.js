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

   socket.on('createMessage', data => {
      data.createdAt = Date.now();
      console.log('create message: ', data);

      //broadcast to all connected clients
      io.emit('newMessage', data);
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
