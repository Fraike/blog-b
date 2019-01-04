const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const model = require('./model')

const server = require('http').Server(app)
const articleRouter = require('./article')
const albumRouter = require('./album')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(articleRouter)
app.use(albumRouter)

server.listen(5000,function(){
    console.log('博客后台启动成功')
})
