// 统计指定目录中文件总大小。要考虑目录中还有子目录的情况。可以同步编码，异步更好。
 
const fs = require('fs')

function readFile(url) {
  fs.access(url, (err) => {
    // 先判断目录是否具有权限
    if (err) return console.error(err)
    fs.stat(url, (err, statObj) => {
      console.log(statObj.size)
    })
  })
}

readFile('b')