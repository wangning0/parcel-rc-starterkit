/**
 * 升级脚手架命令处理
 * 
 *  - options
 *  - exec
 *  - desc
 */

const update = {
    options: (yargs) => {},
    exec: (args) => {
        console.log(args);
    },
    desc: "脚手架升级"
}

module.exports = update;