/**
 * 安装依赖 使用了async 所以node版本号要求 v7.6
 */
const path = require('path');
const shell = require('shelljs');
const utils = require('../utils');


const install = {
    options: (yargs) => {
        yargs.option('v', {
            alias: 'v',
            describe: '安装版本'
        })
        yargs.option('d', {
            describe: '安装路径，默认当前文件夹',
            default: process.cwd()
        })
    },
    exec: (args) => {
        run(args);
    },
    desc: "安装模版文件"
}

async function run(args) {
    if(!check_env()) {
        return;
    }  
    const { v, d } = args;
    utils.log(`当前版本：${v}`);
    utils.log(`安装位置：${d}`);
    
    try {
        utils.log('开始下载组件模版文件...');
        await utils.wget(d, v);
        utils.log('下载完成，正在安装依赖库...')
        shell.cd(d);
        await modules_install();
        utils.log('依赖库安装完成...');
        utils.log('执行 npm run start 查看效果吧～🚀');
    } catch(e) {
        utils.error(e);
    }
}

function check_env() {
    if(!shell.which('node') || !shell.which('npm')) {
        utils.error('需要 node 和 npm 环境');
        return false;
    }
    // 使用async node版本 >= 7.6 parcel 要求大于版本大于8
    const node_version = shell.exec('node -v', { silent: true }).slice(1);
    if(!utils.compare_versions(node_version, '8.0')) {
        utils.error('node版本需大于v7.6版本');
        return false;
    }
    return true;
}

function modules_install() {
    return new Promise((res, rej) => {
        const c = shell.exec('npm install --registry https://registry.npm.taobao.org', { async: true });
        c.stdout.on('data', (data) => {
            utils.log(data);
        })
        c.stderr.on('data', (data) => {
            // npm warn  也算是errors 输出 不能用error
            utils.log(data);
        })
        c.stdout.on('end', () => {
            res(true);
        })
    })
}

module.exports = install;