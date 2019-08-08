const shell = require('shelljs');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

console.log(dbName)
console.log(username)
console.log(password)

console.log('Program has been started');

cron.schedule('0 1 * * *', () => {
    console.log('making dump');
    shell.exec('mongodump '+ `${dbName ? `--db ${dbName}` : ''} ${username ? `--username ${username}` : ''} ${password ? `--password ${password}` : ''}` +' --gzip --out /home/developer/mongodbbackups/`date +"%Y-%m-%d-%H:%M:%S"`');
});