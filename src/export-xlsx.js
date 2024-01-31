/*
  node-xlsx 规范
  data 格式规律：一行中列的元素一定是全的，可以是空
  ranges 合并行：{s: {c: 0, r: 0}, e: {c: 0, r: 1}}; // A1:A4
*/
var xlsx = require('node-xlsx').default;
const fs = require('fs')
const path = require('path')
const ioPath = require('./config')

/**
 * @param { string 相对路径带文件名 } fileName
 * @param { Array [ [], [] ] } data
*/
function build (fileName, data, ranges = []) {
  const sheetOptions = {'!merges': ranges}; // 合并行
  let buffer = xlsx.build([{name: '周报', data: data}], {sheetOptions}); // Returns a buffer

  fs.writeFileSync(path.resolve(`${fileName}.xlsx`), buffer)

  buffer = null
  return
}

function chnageName ({ name, tags }) {
  // name 中包含特殊信息时候，取目录信息拼接
  const includeStr = ['poc', 'exp', 'exploit', 'x64', 'x86']
  const lastTag = [...tags].reverse()[0]
  const pureName = name.split('.')[0]
  const format = name.split('.')[1] === 'yaml' ? 'py' : name.split('.')[1]

  if (includeStr.includes(pureName)) {
    return `exp_${lastTag}` + '.' + format
  }

  if (pureName === lastTag) {
    return 'exp_' + pureName + '.' + format
  }

  if (pureName.includes('poc') || pureName.includes('POC')) {
    let b = pureName.toLowerCase().replace('poc', 'exp')
    return 'exp_' + b + '.' + format
  }

  return 'exp_' + pureName + '.' + format
}

const data = require(ioPath.exportPath + 'nine_type.json')
function edit_data () {
  const header = [ '种类', '名称' ]
  let finnal = []
  Object.entries(data).forEach(([k, itemArr], index) => {
    itemArr.forEach(item => {
      if (item.name !== '__init__.py') {
        finnal.push([k, chnageName(item)])
      }
    })
  })
  return [ header, ...finnal ]
}

build(ioPath.exportPath + 'nine_type', edit_data())