/**
 * Send room joining info using AJAX
 */
function joinRoom() {
   var xhr = new XMLHttpRequest();
   xhr.open('POST', '/login');
   xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
   function handleReadyStateChanged() {
      if(xhr.readyState === 4 && xhr.status === 200) {
         console.log(xhr.responseText);
      }
   }

   xhr.onreadystatechanged = handleReadyStateChanged;
   var data = {
      displayName: document.getElementById('displayName').value,
      roomName: document.getElementById('roomName').value,
      password: document.getElementById('password').value
   }
   xhr.send(JSON.stringify(data));
}

document.getElementById('submit').addEventListener('click', function(event) {
   event.preventDefault();
   joinRoom();
});
