const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// For now, client is served as static but it should be a react app in the future
app.use(express.static('client'));

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('chat message', (msg) => {
		console.log(msg);
		io.emit('chat message', msg);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
