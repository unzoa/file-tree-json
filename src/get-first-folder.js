const fs = require('fs');
const path= require('path')

// 指定要获取目录的路径
const directoryPath = path.resolve('D:/Desktop/poc');

// 使用 fs.readdir 方法读取目录内容
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // 过滤出目录，而不是文件
    const subdirectories = files.filter(file => fs.statSync(`${directoryPath}/${file}`).isDirectory());

    // 打印一级目录名
    console.log('一级目录名:', subdirectories);
});
