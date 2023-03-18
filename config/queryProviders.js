import mysql from './db.js';

export default {
    exec: (query) => {
        return new Promise(function (resolve, reject) {
            mysql.query(query, (err, res) => {
                if (!err) {
                    resolve(res);
                }else{
                    reject(err);
                }
            });
        });
    },
    table: (table) => {
        return new Promise(function (resolve, reject) {
            const query = `SELECT * FROM ${table}`;
            mysql.query(query, (err, res) => {
                if (!err) {
                    resolve(res);
                }else{
                    reject(err);
                }
            });
        });
    },
    row: (table, id) => {
        return new Promise(function (resolve, reject) {
            const query = `SELECT * FROM ${table} WHERE id = ${id}`;
            mysql.query(query, (err, res) => {
                if (res.length > 0) {
                    resolve(res[0]);
                }else{
                    reject(err);
                }
            });
        });
    },
    cell: (table, cell, id) => {
        return new Promise(function (resolve, reject) {
            const query = `SELECT ${cell} FROM ${table} WHERE id = ${id}`;
            mysql.query(query, (err, res) => {
                if (res[0][cell] !== undefined) {
                    resolve(res[0][cell]);
                }else{
                    reject(err);
                }
            });
        });
    },
    insert: (table, cols) => {
        return new Promise(function (resolve, reject) {
            let values = [];
            let query = `INSERT INTO ${table} (`;
            Object.keys(cols).forEach(function (key, i) {
                if (i > 0) {
                    query += ",";
                }
                query += key;
                values.push(cols[key]);
            });
            query += ") VALUES(";
            Object.keys(cols).forEach(function (key, i) {
                if (i > 0) {
                    query += ",";
                }
                query += "?";
            });
            query += ")";
            mysql.query(query, values, (err, res) => {
                if (!err) {
                    if (res.insertId !== undefined && res.insertId > 0) {
                        resolve(res);
                    } else {
                        reject(err);
                    }
                } else {
                    reject(err);
                }
            });
        });
    },
    update: (table, id, cols) => {
        return new Promise(function (resolve, reject) {
            let query = "UPDATE `"+table+"` SET ";
            Object.keys(cols).forEach(function (key, i) {
                if (i > 0) {
                    query += ",";
                }
                query += "`"+key+"`='"+cols[key]+"'";
            });
            query += " WHERE id = " + id;
            mysql.query(query, (err, res) => {
                if (!err) {
                    resolve(res);
                }else{
                    reject(err);
                }
            });
        });
    },
    delete: (table, id) => {
        return new Promise(function (resolve, reject) {
            let query = "DELETE FROM `"+table+"` WHERE id = "+ id;
            mysql.query(query, (err, res) => {
                if (!err) {
                    resolve(res);
                }else{
                    reject(err);
                }
            });
        });
    }
};