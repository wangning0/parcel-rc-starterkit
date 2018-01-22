/**
 * 初始化脚手架命令处理
 *  
 *  - options
 *  - exec
 *  - desc
 */
const path = require('path');
const shell = require('shelljs');
const utils = require('../utils');
const libRoot = path.resolve(__dirname, '..');

const init = {
    options: (yargs) => {
        yargs.option('v', {
            desc: '脚手架版本号'
        })
    },
    exec: (args) => {
        const version = args.v || 'latest';
        const cli_root = path.resolve(libRoot, 'index.js');
        const client = shell.exec(`node ${cli_root} install -v ${version}`);
    },
    desc: "初始化脚手架"
}

module.exports = init;