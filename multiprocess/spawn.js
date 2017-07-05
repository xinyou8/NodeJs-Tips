/**
创建的新进程，也要等主线程执行完毕后才交接执行权
与exec不同的是，是先执行子进程还是先退出子进程
*/

'use strict'
var fs = require('fs');
var child_process = require('child_process');

for(var i=0; i<3; i++){

    //每一次都是创建了一个新进程
    var workerProcess = child_process.spawn('node', ['support.js', i]);

    workerProcess.stdout.on('data', function(data){
        console.log('stdout:' + data);
    });

    workerProcess.stderr.on('data', function(data){
        console.log('stderr:' + data);
    });

    workerProcess.on('close', function(code){
        console.log('子进程已退出，退出码 ' + code);
    });
   
    console.log('主线程over');
}

/**
输出1：
主线程over
主线程over
主线程over
stdout:进程 0 执行。
stdout:进程 1 执行。
子进程已退出，退出码 0
子进程已退出，退出码 0
stdout:进程 2 执行。
子进程已退出，退出码 0

------------------------------

输出2：
主线程over
主线程over
主线程over
stdout:进程 0 执行。
子进程已退出，退出码 0
stdout:进程 1 执行。
子进程已退出，退出码 0
stdout:进程 2 执行。
子进程已退出，退出码 0
------------------------------
出现了两种输出，原因不明
第二种是我们想要的
*/
