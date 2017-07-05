'use strict'
var http = require('http');

//请求数据，包括主机、端口、文件名
var opt = {
    host: 'localhost',
    port: '8001',
    path: '/output.txt'
};

//回调函数
var callback = function(res){
    var body = '';
    
    //处理从服务器返回的数据
    res.on('data', function(chunk){
        body += chunk;
    });
    res.on('end', function(){
        console.log(body);
    });
};

//发起请求链接
var req = http.request(opt, callback);
req.end();
