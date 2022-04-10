const Database = require('better-sqlite3');

const logdb = new Database('log.db');

const stmt = logdb.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );

let row = stmt.get();

if (row == undefined) {
    const sqlInit = `
        CREATE TABLE accessLog ( 
            id INTEGER PRIMARY KEY,
            remoteaddr VARCHAR,
            remoteuser VARCHAR,
            time VARCHAR, 
            method VARCHAR,
            url VARCHAR,
            protocol VARCHAR, 
            httpversion NUMERIC, 
            status VARCHAR, 
            referer VARCHAR, 
            useragent CARCHAR);
    `;
    logdb.exec(sqlInit);
} 
// Export all of the above as a module so that we can use it elsewhere.
module.exports = logdb