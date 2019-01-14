const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}

Router.post('/login',function(req,res){
    const {account,password} = req.body
    User.findOne({account,password},function(err,doc){
        if(err){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,msg:'success'})
    })
   
    // albumModel.save(function(e,d){
    //     if(e){
    //         return res.json({code:1,msg:'后端出错'})
    //     }
    //     return res.json({code:0,msg:'success'})
    // })
   
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