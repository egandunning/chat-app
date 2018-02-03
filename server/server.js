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

   socket.on('disconnect', socket => {
      console.log('user disconnected');
   });
});

server.listen(port, () => {
   console.log(`server started on port ${port}`)
});
