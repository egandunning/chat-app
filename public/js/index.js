function joinRoom() {
   var xhr = new XMLHttpRequest();
   xhr.open('POST', '/login');

   function handleReadyStateChanged() {
      if(xhr.readyState === 4 && xhr.status === 200) {
         console.log(xhr.responseText);
      }
   }

   xhr.onreadystatechanged = handleReadyStateChanged;
   var data = {
      displayName: document.getElementById('displayName'),
      roomName: document.getElementById('roomName'),
      password: document.getElementById('password')
   }
   xhr.send(JSON.stringify(data));
}
