const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const model = require('./model')
//博客后台接口
const server = require('http').Server(app)
const articleRouter = require('./article')
const albumRouter = require('./album')
const userRouter = require('./user')
const shareRouter = require('./share')
//小程序后台接口
const miniRouter = require('./mini')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(articleRouter)
app.use(albumRouter)
app.use(userRouter)
app.use(shareRouter)
app.use(miniRouter)

server.listen(5000,function(){
    console.log('博客后台启动成功')
})
