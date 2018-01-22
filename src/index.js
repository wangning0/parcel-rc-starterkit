const path = require('path');
const fs = require('fs-extra');
const yargs = require('yargs');
const utils = require('./utils');

const commands_path = path.join(__dirname, 'commands');

fs.ensureDirSync(commands_path);

const commands = [];
const commands_file = fs.readdirSync(commands_path);

commands_file.map(file => {
    load_commands(file);
})

try {
    if(yargs.argv._.length === 0 && !process.argv[2]) {
        utils.log("使用react-rc-starterkit -h获得更多消息");
        return null;
    }
} catch(e)  {
    utils.error(e);
}

function load_commands(file) {
    const file_path = path.resolve(commands_path, file);
    const file_stat = fs.lstatSync(file_path);

    if(path.extname(file) !== '.js' && !file_stat.isFile()) {
        utils.error('commands内存在不合法文件');
        return null;
    }

    const command_module = require(path.resolve(commands_path, file));
    if(!command_module) {
        utils.error(`${file}中module不存在`);
        return null;
    }
    const command_name = path.basename(file, '.js');
    yargs.command(command_name, command_module.desc, command_module.options, command_module.exec); 
}

