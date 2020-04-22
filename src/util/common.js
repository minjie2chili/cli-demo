const mapActions = {
    create: {
        alias: "c",
        description: "创建一个项目",
        examples: [
            "lee-cli create <project-name>"
        ]
    },
    download:{
        alias: "d",
        description: "克隆一个项目",
        examples: [
            "lee-cli download <project-name>"
        ]
    },
    config: { //配置文件
        alias: 'conf', //别名
        description: 'config project variable', // 描述
        examples: [ //用法
            'lee-cli config set <k> <v>',
            'lee-cli config get <k>'
        ]
    },
    '*': {
        alias: '', //别名
        description: 'command not found', // 描述
        examples: [] //用法
    }
}

module.exports = {
    mapActions
}