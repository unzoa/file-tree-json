function convertToTagStructure(obj, path = []) {
  let result = [];

  for (let key in obj) {
    const newPath = [...path, key];

    if (typeof obj[key] === 'object') {
      result = result.concat(convertToTagStructure(obj[key], newPath));
    } else {
      result.push({
        name: key,
        tags: newPath.slice(0, -1), // Exclude the last element (file name)
        env: newPath[0]
      });
    }
  }

  return result;
}


const fs = require('fs')
const ioPath = require('./config')
const data = require(ioPath.exportPath + 'read.json')
const tagStructure = convertToTagStructure(data);

fs.writeFile(ioPath.exportPath + 'tags-data.json', JSON.stringify(tagStructure, null, 2), 'utf8', (err, body) => {
  if (err) {
    console.log(err)
  }
})
