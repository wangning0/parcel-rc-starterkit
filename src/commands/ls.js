/**
 * 列出脚手架版本命令处理
 * 
 *  - options
 *  - exec
 *  - desc
 */

const ls = {
    options: (yargs) => {},
    exec: (args) => {
        console.log(args);
    },
    desc: "所有版本号"
}

module.exports = ls;