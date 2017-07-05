'use strict'
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
    //获取url的请求文件名
    var pathname = url.parse(req.url).pathname;
    
    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");

    fs.readFile(pathname.substr(1), function(err, data){
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type':'text/html'});
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data.toString());
        }
        res.end();
    })
    //监听8001端口
}).listen(8001); 
