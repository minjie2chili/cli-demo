const program = require("commander"); // commander处理用户命令行数据
const {mapActions} = require("./util/common");
const path = require("path")
const chalk = require("chalk"); 
const symbols = require("log-symbols");
const fs = require("fs");
const { version } = require("./util/constants")

// Reflect.ownKeys(target) 相当于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
// Object.keys(target)只返回target自身可枚举属性

// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，
// 其中：

// 数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径 
// 第二个元素process.argv[1]——为当前执行的JavaScript文件路径 
// 剩余的元素为其他命令行参数

Reflect.ownKeys(mapActions).forEach((action)=>{
    program.command(action)
        .alias(mapActions[action].alias)
        .description(mapActions[action].description)
        .action(()=>{
            if(action === "*"){
                console.log(mapActions[action].description);
            }else{
                let projectName = process.argv[3]
                if (!fs.existsSync(projectName)) {
                    require(path.resolve(__dirname,action))(projectName);
                }else{
                    console.error(symbols.error,chalk.red("目录已存在！"))
                }
            }
        })
})
function help(){
    console.log("\nExamples")
    Reflect.ownKeys(mapActions).forEach((action)=>{
        mapActions[action].examples.forEach(example=>{
            console.log(example)
        })
    })
}
program.on("--help",help)
program.on("-h",help)

program.version(version,"-v --version")
       .parse(process.argv); // parse置于最后，用于解析输入的命令