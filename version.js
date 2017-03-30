/* eslint-env node */
/* global require */

const childProcess = require('child_process');
const packageJson = require('./package.json');

const spawnSync = childProcess.spawnSync;

const version = {
  base: packageJson.version,
  date: new Date().toISOString().slice(2)
    .replace(/[-:]|\..+/g, '')
    .replace(/T/, '.'),
};

if (process.env.NODE_ENV === 'production') {
  version.combined = version.base;
} else {
  version.hash = (() => {
    function stdout(cmd) {
      return cmd.stdout === null ? 'nogit' : String(cmd.stdout).trim();
    }

    const gitLogHash = stdout(spawnSync('git', ['log', '-n1', '--pretty=format:%h']));
    const gitStatus = stdout(spawnSync('git', ['status', '-s']));

    return gitLogHash + (gitStatus ? '-mod' : '');
  })();
  const link = version.base.indexOf('-') === -1 ? '-' : '.';
  version.combined = `${version.base}${link}${version.date}+${version.hash}`;
}

module.exports = version;
