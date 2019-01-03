const express = require('express')
const Router = express.Router()
const model = require('./model')
const Article = model.getModel('article')
const formidable  = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/',
    domain = "http://localhost:3000";

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

    console.log(uploadToken)
})
Router.post('/uploadAlbum',function(req,res){
    var form = new formidable.IncomingForm(); 
    form.encoding = 'utf-8';        //设置编辑
    // form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    console.log('1')
    form.parse(req, function(err, fields, files) {

        if (err) {
            console.log('2'+files);
        //   res.locals.error = err;
        //   res.render('index', { title: TITLE });
          return;
        }
       
    
        // var extName = '';  //后缀名
        // switch (files.fulAvatar.type) {
        //   case 'image/pjpeg':
        //     extName = 'jpg';
        //     break;
        //   case 'image/jpeg':
        //     extName = 'jpg';
        //     break;
        //   case 'image/png':
        //     extName = 'png';
        //     break;
        //   case 'image/x-png':
        //     extName = 'png';
        //     break;
        // }
    
        // if(extName.length == 0){
        //   res.locals.error = '只支持png和jpg格式图片';
        //   res.render('index', { title: TITLE });
        //   return;
        // }
    
        // var avatarName = Math.random() + '.' + extName;
        // //图片写入地址；
        // var newPath = form.uploadDir + avatarName;
        // //显示地址；
        // var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        // console.log("newPath",newPath);
        // fs.renameSync(files.fulAvatar.path, newPath);  //重命名
        // res.json({
        //   "newPath":showUrl
        // });
      });
    return res.json({code:0,msg:'success'})
    
   
})

module.exports = Router