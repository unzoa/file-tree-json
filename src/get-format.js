const fs = require('fs')
const ioPath = require('./config')
const data = require(ioPath.exportPath + 'tags-data.json')

function get_format () {
  const formatType = []
  data.forEach(i => {
    formatType.push(i.name.split('.').reverse()[0])
  })

  const formatAfter = Array.from(new Set(formatType))

  fs.writeFileSync(ioPath.exportPath + 'format.json', JSON.stringify(formatAfter), 'utf8', (err, body) => {
    if (err) {
      console.log(err)
    }
  })
}

get_format()