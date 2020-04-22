- 首先使用npm link命令建立链接

（一）template的package.json自定义字段写成"{{xxx}}"字样

（二）download-git-repo 从仓库获取代码的使用说明：https://www.npmjs.com/package/download-git-repo

（三）自定义的package.json需要是3位，否则会报warning，无法npm install
### npm包管理的一些warning

1. npm warn xxx No description
项目描述为空，npm init的时候未加description

2. npm warn xxx No repository field
仓库没有设置字段,可以在package.json中加：
```javascript
"repository": {
    "type": "git",
    "url": "git://github.com/xxxxx/xxxx.git"
}
```
或者加私有属性 "private":true

