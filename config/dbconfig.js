const mysql = require("mysql2");

const pool = mysql.createPool({
    port :3306,
    host :"localhost",
    user :"root",
    password :"1234",
    database :"lc_data",
    connectionLimit : 10
});
module.exports = pool;