const download = require('download');

module.exports = {
    log: (msg) => {
        console.log(msg);
    },
    error: (error) => {
        throw new Error(error);
    },
    compare_versions: (versions, compared_versions) => {
        const v = versions.split('.');
        const c_v = compared_versions.split('.');
        for(let i = 0; i < v.length; i++) {
            if (~~v[i] >= ~~c_v[i]) {
                return true;
            } else {
                return false;
            }
        }
    },
    wget: (dir, version) => {
        const release_path = `https://github.com/wangning0/parcel-rc-template/archive/${version}.zip`;
        const cmd = download(release_path, dir, { extract: true, strip: 1 });
        cmd.stdout = process.stdout;
        return cmd;
    }
}