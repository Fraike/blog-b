const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}
const qiniu = require('qiniu')


Router.post('/login',function(req,res){

    
    const {account,password} = req.body
    var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
    var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    var options = {
        scope: 'wwtfile',
      };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    User.findOne({account,password},function(err,doc){
        if(err){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        res.cookie('token',uploadToken)
        return res.json({code:0,msg:'success',token:uploadToken})
    })
   
    // albumModel.save(function(e,d){
    //     if(e){
    //         return res.json({code:1,msg:'后端出错'})
    //     }
    //     return res.json({code:0,msg:'success'})
    // })
    // var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
    // var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
    // var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // var options = {
    //     scope: 'wwtfile',
    //   };
    // var putPolicy = new qiniu.rs.PutPolicy(options);
    // var uploadToken=putPolicy.uploadToken(mac);
    // if(uploadToken){
    //     return res.json({code:0,msg:'获取token成功',token:uploadToken})
    // }else{
    //     return res.json({code:1,msg:'获取token失败'})
    // }
   
})

Router.get('/info',function(req, res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后台出错'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })

   
})

module.exports = Router