var express = require('express');
var app = express();
 
//设置静态文件路径
app.use(express.static('public')); 
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
 
app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       //通过req.query取get数据
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
