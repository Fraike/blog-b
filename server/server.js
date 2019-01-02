const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const model = require('./model')
const Chat = model.getModel('chat')

const server = require('http').Server(app)

app.use(cookieParser())

app.unsubscribe(bodyParser.json())

server.listen(8888,function(){
    console.log('博客后台启动成功')
})
