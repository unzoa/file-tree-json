const fs = require('fs');
const path = require('path');
const ioPath = require('./config')

function getDirectoryStructure(folderPath) {
  const stat = fs.statSync(folderPath);

  if (!stat.isDirectory()) {
    return path.basename(folderPath);
  }

  const files = fs.readdirSync(folderPath);
  const result = {};

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    result[file] = getDirectoryStructure(filePath);
  });

  return result;
}

const folderPath = path.resolve(ioPath.readPath); // 请将路径替换为你要操作的目录路径
const directoryStructure = getDirectoryStructure(folderPath);
// console.log(folderPath)
// console.log(JSON.stringify(directoryStructure, null, 2));

fs.writeFile(ioPath.exportPath + 'read.json', JSON.stringify(directoryStructure, null, 2), 'utf8', (err, body) => {
  if (err) {
    console.log(err)
  }
})
