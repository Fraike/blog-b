const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const model = require('./model')

const server = require('http').Server(app)
const articleRouter = require('./article')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(articleRouter)

server.listen(8888,function(){
    console.log('博客后台启动成功')
})
