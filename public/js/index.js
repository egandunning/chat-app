let socket = io(); //make request to server to open web socket

socket.on('connect', function() {
   console.log('connected');
});

socket.on('disconnect', function() {
   console.log('unable to connect');
});

socket.on('newMessage', function(data) {
   console.log('New message', data);
   var li = $('<li></li>');

   var dateString = new Date(data.createdAt).toString();

   li.text(data.from + ': ' + data.text + ' (' + dateString + ')');

   $('#messages').append(li);
});

$('#messageForm').on('submit', function(e) {
   //prevent page reload
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'user',
      text: $('[name=message]').val()
   }, function() {
      $('[name=message]').val('');
   });
});