let socket = io(); //make request to server to open web socket

socket.on('connect', function() {
   console.log('connected');

   socket.emit('createMessage', {
      to: 'egan',
      text: 'Hi friend!'
   });
});

socket.on('disconnect', function() {
   console.log('unable to connect');
});

socket.on('newMessage', function(data) {
   console.log('New message', data);
});