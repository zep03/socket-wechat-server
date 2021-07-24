var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server, { cors: true })

server.listen(3000, () => {
    console.log('服务器启动成功，正在监听3000端口...')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    console.log('新用户连接了！')
    socket.emit('send', { name: 'zep' })
    socket.on('other', function (data) {
        console.log(data);
    })
})
