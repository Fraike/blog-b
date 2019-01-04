const express = require('express')
const Router = express.Router()
const model = require('./model')
const Article = model.getModel('article')

const qiniu = require('qiniu')

Router.post('/uploadArticle',function(req,res){
    const {title,date,content} = req.body
    console.log(req.body)
    const articleModel = new Article({title,date,content})
    articleModel.save(function(e,d){
        if(e){
            return res.json({code:1,msg:'后端出错'})
        }
        return res.json({code:0,msg:'success'})
    })
   
})

Router.get('/getToken',function(req,res){
    var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
    var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    var options = {
        scope: 'blog',
      };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    if(uploadToken){
        return res.json({code:0,msg:'获取token成功',token:uploadToken})
    }else{
        return res.json({code:1,msg:'获取token失败'})
    }
})

module.exports = Router