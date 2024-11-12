import mysql from 'mysql2/promise';

export default mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ID,
    port: parseInt(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 10000,
    connectionLimit: 50
});