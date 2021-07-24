var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server, { cors: true })
const axios = require("axios");
server.listen(3000, () => {
    console.log('服务器启动成功，正在监听3000端口...')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

async function sendToRobot(data) {
    let response = await axios({
        method: "GET",
        url: 'http://api.tianapi.com/txapi/robot/index',
        params: {
            key: '5fb41161aff1256441d57dafeef854fc',
            question: data
        }
    })
    console.log(typeof (response.data))
    console.log(response.data.newslist[0].reply)
    return response.data
}

io.on('connection', function (socket) {
    console.log('新用户连接了！')
    socket.on('send',async function (data) {
        // 给聊天机器人接口发送请求
        let response = await axios({
            method: "GET",
            url: 'http://api.tianapi.com/txapi/robot/index',
            params: {
                key: '5fb41161aff1256441d57dafeef854fc',
                question: data
            }
        })
        const newData = {
            // msg: data.msg + '？？？',
            msg: response.data.newslist[0].reply,
            timestamp: Date.now()
        }
        socket.emit('msg', newData)
    })
})
