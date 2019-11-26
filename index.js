const log4js = require('log4js');

const upd = require('./src/updater');
const serv = require('./src/server');

process.title = "r6unhasher";
log4js.configure("log4j.json");

upd();
serv();