const downloadGit = require("download-git-repo"); // 从仓库下载
const inquirer = require("inquirer"); // 用户交互工具——自定义配置
const ora = require("ora")

const toolObj = {
    "vue-cli":"https://github.com/vuejs/vue-cli.git",
    "create-react-app":"https://github.com/facebook/create-react-app.git"
}
const promptList = [
  {
    type: "list",
    message: "请选择要安装的工具",
    name: "tool",
    choices: Object.keys(toolObj)
  }
];
module.exports = projectName => {
  inquirer.prompt(promptList).then((answer) => {
    const spinner = ora();
    spinner.start("正在初始化项目...\n")
    downloadGit(
      `direct:${toolObj[answer["tool"]]}`,
      projectName,
      { clone: true },
      function(err) {
        if (err) {
            console.log(err);
        }else{
            spinner.succeed('项目初始化完毕！');
        }
      }
    );
  });
};
