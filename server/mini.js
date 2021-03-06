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
    }).sort({_id: -1})
   
})

Router.get('/deleteAllShare',function(req,res){
  mShare.remove({},function(err,doc){
      if (err) {
          return res.json({code:1,msg:'删除小程序首页数据失败'})
      }
      return res.json({code:0,list:doc,msg:'删除小程序首页数据成功'})
  })
 
})

Router.post('/getAlbumList',async function(req,res){
    const albumName = req.body
  
    var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
    var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var bucket = 'wwtfile';

    let imgArray = []


    for(let i=0;i<albumName.length;i++){
      imgArray.push([])

      var options = {
        limit: 100,
        prefix: 'album/'+albumName[i]+'/',
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
          items.forEach(function(item,idx) {
            imgArray[i].push("http://cdn.mitty.work/"+item.key)
            // console.log(imgArray)
            // console.log(item.putTime);
            // console.log(item.hash);
            // console.log(item.fsize);
            // console.log(item.mimeType);
            // console.log(item.endUser);
            // console.log(item.type);
            
          });

          if(i==2){
            return res.json({code:0,data:imgArray,msg:'获取相册列表成功'})
          }
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
    }
})


Router.post('/getGalleryList',async function(req,res){
  const {albumName} = req.body;
  console.log(albumName)
  var accessKey = 'VXe87vEB8q4ProaK5hQSlGEoJKsWWKYc2UwlMJ4Y';
  var secretKey = 'ZdVX2B9-sq1DzqUhH56XQrqhHerMC4OECRl8_V5q';
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var bucket = 'wwtfile';

  let imgArray = []

    var options = {
      limit: 100,
      prefix: 'album/'+albumName+'/',
    };

    await bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        return res.json({code:1,data:err,msg:'获取相册列表失败'})
        throw err;
      }
      if (respInfo.statusCode == 200) {
        var items = respBody.items;
        items.forEach(function(item,idx) {
          imgArray.push("http://cdn.mitty.work/"+item.key)  
          
        });
        return res.json({code:0,data:imgArray,msg:'获取相册列表成功'})
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
    
})

module.exports = Router