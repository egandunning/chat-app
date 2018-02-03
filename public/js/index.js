let socket = io(); //make request to server to open web socket

socket.on('connect', function() {
   console.log('connected');
});

socket.on('disconnect', function() {
   console.log('unable to connect');
});

var messages = $('#messages');

socket.on('newMessage', function(data) {
   console.log('New message', data);
   var li = $('<li></li>');

   var dateString = new Date(data.createdAt).toString();

   li.text(data.from + ': ' + data.text + ' (' + dateString + ')');

   messages.append(li);
});

socket.on('newLocationMessage', function(data) {
   var li = $('<li></li>');

   var link = $('<a target="_blank">My location</a>');
   link.attr('href', data.url);
   
   li.text(data.from + ': ');
   li.append(link);

   messages.append(li);
})

socket.on('connectionCountChanged', function(count) {
   $('#userCount').html(count);
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

var locationButton = $('#locationButton');
locationButton.on('click', function(e) {
   if(!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
   }

   navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage', {
         lat: position.coords.latitude,
         lng: position.coords.longitude
      });
   }, function(err) {
      alert('Unable to fetch location');
   });
});