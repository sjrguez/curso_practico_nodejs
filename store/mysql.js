const mysql = require('mysql');

const config = require('../config')

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};


let connection;

function handleCon() {
    const connectionDB = mysql.createConnection(dbConfig);

    connectionDB.connect((error) => {
        if (error) {
            console.error('[db error]', error);
            setTimeout(handleCon, 200);
        } else {
            console.log("============================= DB Connect ============================= ");

        }
    })

    connectionDB.on('error', error => {
        console.error('[db error]', error);

        if (error.code === 'PROTOCOL_CONNECTION_LOST') handleCon();
        throw error;
    })
    connection = connectionDB;
}

function list(table) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table}`
        connection.query(query, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`
        connection.query(query, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}



function insert(table, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`
        connection.query(query, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${table} SET ? WHERE id = ?`
        connection.query(query, [data, data.id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}


function upsert(table, data, isUpdate) {
    if (isUpdate) {
        return update(table, data)
    } else {
        return insert(table, data)
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        const queryDB = `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`
        connection.query(queryDB, query, (error, data) => {
            if (error) return reject(error);

            let info = null
            if (data[0]) info = data[0]
            resolve(info);
        })
    })
}

handleCon();



module.exports = {
        list,
        get,
        upsert,
        query
    }
    // Coneccion