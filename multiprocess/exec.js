/**

*/

'use strict'
var fs = require('fs');
var child_process = require('child_process');

for (var i=0; i<3; i++) {
    //注意support.js后面有空格，为了被arg识别i
    var workerProcess = child_process.exec('node support.js ' + i, function(err, stdout, stderr){
        //stdout就是子进程运行的代码缓存
        if (err) {
            console.log(error.stack);
        } else {
            console.log('stdout:' + stdout);
            console.log('stderr:' + stderr);
        }
    });

    //主线程的exit最先执行，因为只有主线程执行完了，才会去挨个执行子线程
    workerProcess.on('exit', function(code){
        console.log('子进程退出，code为：' + code);
    });

}


/**
输出：
子进程退出，code为：0
stdout:进程 1 执行。
stderr:
子进程退出，code为：0
stdout:进程 0 执行。
stderr:
子进程退出，code为：0
stdout:进程 2 执行。

*/
