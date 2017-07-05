/**
bodyParser.json(options(可选))，返回一个仅仅用来解析json格式的中间件。
                               这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib。
bodyParser.urlencoded(options(可选))，返回一个用来解析body中的urlencoded字符的中间件 
                                     只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib。
*/

/**
multer作为一个中间件传入了app.use，当有上传请求到来时，express会拦截此请求并通过multer组件完成上传操作
在multer初始化方法中传入的是配置对象，我们可以在里面配置我们自定义的参数，例如“文件大小限制”，“文件数量限制”等等。
不仅可以添加限制，还能给上传注册事件，
*/

var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})
 
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
