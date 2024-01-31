const ioPath = require('./config')
const data = require(ioPath.exportPath + 'tags-data.json')

// 文件整理，去掉格式为png，zip
const excludeFormat = ['png', 'PNG', 'zip', 'jpg', 'in', 'c', 'h', 'po', 'mo']
const includeFormat = ['bat', 'php', 'py', 'sh', 'c', 'cpp', 'jar', 'js', 'html', 'yaml']
const dataAfater = data.filter( i => includeFormat.includes( i.name.split('.').reverse()[0] ) )

const fs = require('fs')
fs.writeFileSync(ioPath.exportPath + 'manage-data.json', JSON.stringify(dataAfater), 'utf8', (err, body) => {
  if (err) {
    console.log(err)
  }
})
