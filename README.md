# 读取文件夹结构

## config

配置输入、输出路径

## src

- read.js
  - i: 目标路径
  - o: read.json 多层级文件目录到文件名
- trans-to-tags.js
  - i: read.json
  - o: tags-data.json 将read.json转换成以目录为tags的数据对象
- manage.js
  - i: tags-data.json
  - o: manage-data.json 整理以格式为筛选条件数据输出
- get-format.js
  - i: tags-data.json
  - o: format.json 文件格式种类
- move-files.js
  - i: manage-data.json
  - 移动目标文件到指定目录
- export-by-tag.js
  - i: manage-data.json
  - o: nine_type.json 特定需求，整理输入数据得种类
- export-xlsx.js
  - i: nine_type.json
  - o: nine_type.xlsx 特定需求，输出xlsx文件
