const ioPath = require('./config')
const fs = require('fs')
const data = require(ioPath.exportPath + 'manage-data.json')

const nine_type = {
  '操作系统漏洞': ['Windows', 'Linux'],
  '应用软件漏洞': ['chrome', 'office'],
  '安全软件漏洞': ['F5', 'sangfor', 'topsec'],
  '网络安防设备漏洞': ['cisco', 'hikvision'],
  '物联网设备漏洞': ['avtech'],
  '移动终端设备漏洞': ['jamf', 'samsung'],
  '工控系统漏洞': ['autoexp_plc-master'],
  'Web应用系统漏洞': ['OA', 'ActiveMQ'],
  '虚拟化平台漏洞': ['VMware']
}

let finnal = {
  '操作系统漏洞': [],
  '应用软件漏洞': [],
  '安全软件漏洞': [],
  '网络安防设备漏洞': [],
  '物联网设备漏洞': [],
  '移动终端设备漏洞': [],
  '工控系统漏洞': [],
  'Web应用系统漏洞': [],
  '虚拟化平台漏洞': []
}

Object.entries(nine_type).forEach(([k, typeArr], index) => {
  data.forEach(i => {
    typeArr.forEach(type => {
      if (i.tags.join(',').includes(type)) {
        finnal[k].push(i)
      }
    })
  })
})

fs.writeFile(ioPath.exportPath + 'nine_type.json', JSON.stringify(finnal, null, 2), 'utf8', (err, body) => {
  if (err) {
    console.log(err)
  }
})