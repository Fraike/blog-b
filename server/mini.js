const express = require('express')
const Router = express.Router()
const model = require('./model')
const mShare = model.getModel('mshare')


Router.post('/uploadMShare',function(req,res){
    const {title,content,date,imagesUrl,time,location} = req.body
    console.log(req.body)
    const mShareModel = new mShare({title,content,date,imagesUrl,time,location})
    mShareModel.save(function(e,d){
        if(e){
            return res.json({code:1,msg:'后端出错'})
        }
        return res.json({code:0,msg:'success'})
    })
   
})

Router.get('/getAllMShare',function(req,res){
    mShare.find({},function(err,doc){
        if (err) {
            return res.json({code:1,msg:'获取文章列表失败'})
        }
        return res.json({code:0,list:doc,msg:'获取文章列表成功'})
    })
   
})

module.exports = Router