const express = require('express')
const Router = express.Router()
const url = require('url')
const request = require('request')
const axios = require('axios')
const model = require('./model')
const Share = model.getModel('share')

Router.post('/addShare',function(req,res){
    const {title,desc,urlPath} = req.body
    let targetUrl = urlPath
    let urlString = url.parse(targetUrl)
    let iconUrl = `${urlString.protocol}//${urlString.host}/favicon.ico`
    isHasRootIcon(iconUrl).then(result=>{
        if(result === true) {
            const shareModel = new Share({title,desc,urlPath:iconUrl})
            shareModel.save(function(e,d){
                if(e){
                    return res.json({code:1,msg:'后端出错'})
                }
                return res.json({code:0,msg:'success'})
            })
        }else {
            return res.json({code:1,msg:'没有找到网站icon'})
        }
        console.log(result)
    })
    // const shareModel = new Share({title,desc,url})
    // albumModel.save(function(e,d){
    //     if(e){
    //         return res.json({code:1,msg:'后端出错'})
    //     }
    //     return res.json({code:0,msg:'success'})
    // })
   
})

function isHasRootIcon(url) {
    let pattern = ['ico','png', 'svg', 'jpg']
  
    return new Promise((resolve)=>{
      let returnValue = false
      request.get(url,function(err, res) {
        if(res.statusCode === 200) {
          let redirectPath = res.request.uri.path // 重定向的页面路径
          pattern.forEach(item=>{
            if(redirectPath.split('.')[1]===item) {
              // 如果结尾是 pattern 数组中的一种 则返回 true
              returnValue = true
              resolve(returnValue)
            }
          })
        }else{
            resolve(returnValue)
        }
       
      })
    })
  }

module.exports = Router