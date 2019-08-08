const shell = require('shelljs');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dumpPath = process.env.DUMP_PATH;

console.log(dbName);
console.log(username);
console.log(password);
console.log(dumpPath);

console.log('Program has been started');

cron.schedule('* * * * *', () => {
    console.log('making dump');
    shell.exec('mongodump '+ `${dbName ? `--db ${dbName}` : ''} ${username ? `--username ${username}` : ''} ${password ? `--password ${password}` : ''}` +' --gzip '+ `--out ${dumpPath ? dumpPath : '/home/'}` + '`date +"%Y-%m-%d-%H:%M:%S"`');
});