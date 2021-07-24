var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, { cors: true });

app.get('/', function (req, res) {
    res.send('hello')
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('my other event', function (data) {
        console.log(data);
        socket.emit('news', data);
    });
});
server.listen(5000, () => {
    console.log('listening on *:5000')
});
