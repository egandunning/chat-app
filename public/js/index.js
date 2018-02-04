let socket = io(); //make request to server to open web socket

socket.on('connect', function() {
   console.log('connected');
});

socket.on('disconnect', function() {
   console.log('unable to connect');
});

var messages = $('#messages');
var messageTextBox = $('[name=message]');

socket.on('newMessage', function(data) {
   console.log('New message', data);
   var li = $('<li class="message__text"></li>');

   var msg = $('<span class="message__from"></span>');
   msg.text(data.from + ': ');

   var date = $('<span class="message__date"></span>');
   date.text(data.createdAt);
   
   li.append(msg);
   li.append(data.text);
   li.append(date);

   messages.append(li);
});

socket.on('newLocationMessage', function(data) {
   var li = $('<li class="message__text"></li>');

   var msg = $('<span class="message__from"></span>');
   msg.text(data.from + ': ');

   var link = $('<a target="_blank">My location</a>');
   link.attr('href', data.url);
   
   var date = $('<span class="message__date"></span>');
   date.text(data.createdAt);

   li.append(msg);
   li.append(link);
   li.append(date);

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
      text: messageTextBox.val()
   }, function() {
      messageTextBox.val('');
   });
});

var locationButton = $('#locationButton');
locationButton.on('click', function(e) {
   
   if(!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
   }

   locationButton.attr('disabled', 'disabled').text('Sending.........');

   navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage', {
         lat: position.coords.latitude,
         lng: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send Location');
   }, function(err) {
      alert('Unable to fetch location');
      locationButton.removeAttr('disabled').text('Send Location');
   });
});