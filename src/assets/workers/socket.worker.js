var socket = new WebSocket('ws://localhost:3100');
addEventListener('message', function(event) {
  var message = event.data;
  if(socket && socket.readyState === WebSocket.OPEN && message) {
    socket.send(JSON.stringify(message));  
  }
  socket.onopen = function(e) {};
  socket.onmessage = function(event) {
    // console.log('jsonMes=',event.data);
    postMessage(event.data);
  };
  socket.onerror = function(err) {
    console.log('webworker error');
    postMessage('error');
  };
  socket.onclose = function(close) {
    console.log('webworker close');
    postMessage('close');
    socket.close();
  };
}, false);
