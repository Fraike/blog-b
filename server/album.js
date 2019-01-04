const express = require('express')
const Router = express.Router()
const model = require('./model')
const Album = model.getModel('album')

Router.post('/uploadAlbum',function(req,res){
    const {title,sub,list} = req.body
    console.log(req.body)
    const albumModel = new Album({title,sub,list})
    albumModel.save(function(e,d){
        if(e){
            return res.json({code:1,msg:'后端出错'})
        }
        return res.json({code:0,msg:'success'})
    })
   
})

module.exports = Router