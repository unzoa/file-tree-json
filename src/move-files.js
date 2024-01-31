const fs = require('fs').promises;
const path = require('path');
const ioPath = require('./config')

async function moveFile(sourceFilePath) {
  try {
    // 定义源文件路径和目标文件夹路径
    // const sourceFilePath = '/path/to/source/file.txt';
    const targetFolderPath = ioPath.exportPath + 'files' //  '/path/to/target/folder';

    // 构建目标文件的完整路径
    const targetFilePath = path.join(targetFolderPath, path.basename(sourceFilePath));

    // 使用 fs.promises 进行异步文件迁移
    await fs.rename(sourceFilePath, targetFilePath);
    console.log('文件迁移成功');
  } catch (err) {
    console.error('文件迁移失败:', err);
  }
}

const data = require(ioPath.exportPath + 'manage-data.json')

data.forEach(async i => {
  const pathFile = ioPath.readPath + i.tags.join('/') + '/' + i.name
  await moveFile(pathFile)
})
