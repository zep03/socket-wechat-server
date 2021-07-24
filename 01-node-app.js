const http = require('http') // 创建http服务器
var fs = require('fs')
const app = http.createServer()
app.on('request', (req, res) => {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500)
            return res.end('Error loding!')
        }
        res.writeHead(200)
        res.end(data)
    })
})
app.listen(3000, () => {
    console.log('服务器启动成功，正在监听3000端口...')
})
const io = require('socket.io')(app,  { cors: true }) // cors: true 表示允许跨域
// socket.emit() 表示发送某个事件  // socket.on() 表示监听某个事件
// 监听了用户连接的事件
io.on('connection', socket => {
    console.log('新用户连接了！')
    // socket.emit() 标识给浏览器发送数据
    // 参数1： 事件的名字
    socket.emit('send', { name: 'zep' })
})
