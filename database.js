"use strict";

const Database = require('better-sqlite3');

const logdb = new Database('log.db');

const stmt = logdb.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accessLog';`
    );

let row = stmt.get();

if (row === undefined) {
    const sqlInit = `
        CREATE TABLE accessLog ( 
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT, 
            method TEXT,
            url TEXT,
            protocol TEXT, 
            httpversion TEXT, 
            secure TEXT, 
            status TEXT, 
            referer TEXT, 
            useragent TEXT);
    `;
    logdb.exec(sqlInit);
} 
// Export all of the above as a module so that we can use it elsewhere.
module.exports = logdb