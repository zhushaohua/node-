var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
wss = new WebSocketServer({port: 8080});
wss.on('connection', function (ws,req) {
	const ip = req.connection.remoteAddress;
	console.log(ip);
  ws.on('message', function (message) {
      console.log(message);
      setTimeout(function timeout() {
		    ws.send(Date.now());
		  }, 500);
      wss.clients.forEach(function each(client) {
      	console.log(client.readyState)
      	console.log(WebSocket.OPEN)
      	console.log(client == ws)
	      if (client !== ws && client.readyState === WebSocket.OPEN) {
	        client.send(message);
	      }
	    });
  });
  ws.on('error', function(message){
  	console.log(message)
  })
})
wss.broadcast = function (data) {
	console.log(`data`)
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
