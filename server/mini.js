const express = require('express')
const Router = express.Router()
const model = require('./model')
const mShare = model.getModel('mshare')

const qiniu = require('qiniu')

Router.post('/uploadMShare',function(req,res){
    const {title,content,date,imagesUrl,time,location,avatarUrl} = req.body
    const mShareModel = new mShare({title,content,date,imagesUrl,time,location,avatarUrl})
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
            return res.json({code:1,msg:'获取小程序首页数据失败'})
        }
        return res.json({code:0,list:doc,msg:'获取小程序首页数据成功'})
    })
   
})

Router.post('/getAlbumList',async function(req,res){
    const {albumName} = req.body
    console.log(req.body)

    var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
    var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var bucket = 'wwtfile';
    var options = {
        limit: 100,
        prefix: 'album/',
    };

    await bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          return res.json({code:1,data:err,msg:'获取相册列表失败'})
          throw err;
        }
        if (respInfo.statusCode == 200) {
          //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          //指定options里面的marker为这个值
          var nextMarker = respBody.marker;
          var commonPrefixes = respBody.commonPrefixes;
        //   console.log(nextMarker);
        //   console.log(commonPrefixes);
          var items = respBody.items;
          
          let imgArray = []
          items.forEach(function(item) {
            imgArray.push("http://cdn.mitty.work/"+item.key)
            // console.log(item.putTime);
            // console.log(item.hash);
            // console.log(item.fsize);
            // console.log(item.mimeType);
            // console.log(item.endUser);
            // console.log(item.type);
          });
          return res.json({code:0,data:imgArray,msg:'获取相册列表成功'})
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });


    // mShare.find({},function(err,doc){
    //     if (err) {
    //         return res.json({code:1,msg:'获取小程序首页数据失败'})
    //     }
    //     return res.json({code:0,list:doc,msg:'获取小程序首页数据成功'})
    // })
   
})

module.exports = Router