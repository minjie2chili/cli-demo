const inquirer = require("inquirer");
const ora = require("ora");
const fs = require("fs");
const metalsmith = require("metalsmith");
const handlebars = require("handlebars"); // 模板编译
const path = require("path");
const spawnSync = require("child_process").spawnSync;
// __dirname返回被执行的js的目录
// process.cwd()返回返回执行node命令进程的目录
// __filename返回模块文件的带完整路径的文件名
const copyFile = (name, answer) => {
  const spinner = ora();
  spinner.start("正在初始化项目...");

  metalsmith(__dirname)
    .source("../template")
    .destination(path.resolve(process.cwd(), name))
    .build((err, file) => {
      if (err) {
        console.log(err);
      } else {
        spinner.succeed("项目生成完毕！");
        const fileName = `${name}/package.json`;
        const meta = {
          name,
          description: answer.description,
          author: answer.author,
          version: answer.version
        };
        // 自定义字段覆盖package.json
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          // 这里也可以直接使用字符串对象互转方式合并对象
          // const result = JSON.stringify(Object.assign(JSON.parse(content),meta))
          fs.writeFileSync(fileName, result);
        }
        // 自动化npm install
        spinner.start("正在初始化项目...");
        spawnSync(
          process.platform === "win32" ? "npm.cmd" : "npm",
          ["install"],
          {
            stdio: "inherit",
            cwd: name
          }
        );
        // 建立  代码文件夹
        spinner.succeed("项目初始化完毕！");
      }
    });
};
module.exports = projectName => {
  inquirer
    .prompt([
      {
        name: "description",
        message: "请输入项目描述"
      },
      {
        name: "author",
        message: "请输入作者名称"
      },
      {
        name: "version",
        message: "请输入版本号"
      }
    ])
    .then(answer => {
      copyFile(projectName, answer);
    });
};
