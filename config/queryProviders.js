import mysql from './db.js';

export default {
    except: (query, fn) => {
        mysql.query(query, (err, res) => {
            fn(err, res);
        });
    },
    getDataTable: (table, fn) => {
        const query = `SELECT * FROM ${table}`;
        mysql.query(query, (err, res) => {
            fn(err, res);
        });
    },
    getDataRow: (table, id, fn) => {
        const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        mysql.query(query, (err, res) => {
            if (res.length > 0) {
                fn(err, res[0]);
            }else{
                fn(err, res);
            }
        });
    },
    getDataCell: (table, cell, id, fn) => {
        const query = `SELECT ${cell} FROM ${table} WHERE id = ${id}`;
        mysql.query(query, (err, res) => {
            if (res.length > 0) {
                fn(err, res[0][cell]);
            }else{
                fn(err, res);
            }
        });
    },
    insertRow: (table, cols, fn) => {
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
                    fn(err, res.insertId);
                } else {
                    fn(err, res);
                }
            } else {
                fn(err, res);
            }
        });
    },
    updateRow: (table, id, cols, fn) => {
        let query = "UPDATE `"+table+"` SET ";
        Object.keys(cols).forEach(function (key, i) {
            if (i > 0) {
                query += ",";
            }
            query += "`"+key+"`='"+cols[key]+"'";
        });
        query += " WHERE id = " + id;
        mysql.query(query, (err, res) => {
            fn(err, res);
        });
    },
    deleteRow: (table, id, fn) => {
        let query = "DELETE FROM `"+table+"` WHERE id = "+ id;
        mysql.query(query, (err, res) => {
            fn(err, res);
        });
    }
};