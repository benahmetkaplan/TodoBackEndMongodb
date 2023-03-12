import express from "express";
import connection from '../config/db.js';

const router = express.Router();
const table = "events";

// GET: List all rows
router.get('/', (req, res) => {
    const query = `SELECT * FROM ${table}`;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                statusCode: 200,
                message: null,
                rows: result,
                row: null,
                insertId: null
            });
        } else {
            console.log("Error:", err);
            return res.status(400).json({
                statusCode: 400,
                message: err,
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

// GET: Row by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.length > 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: null,
                    rows: null,
                    row: result[0],
                    insertId: null
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Row not found!",
                    rows: null,
                    row: null,
                    insertId: null
                });
            }
        } else {
            console.log("Error:", err);
            return res.status(400).json({
                statusCode: 400,
                message: err,
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

// POST: Create row
router.post('/', (req, res) => {
    const query = `INSERT INTO ${table} (title, content, statu) VALUES(?,?,?)`;
    const values = [req.body.title, req.body.content, req.body.statu];
    connection.query(query, values, (err, result) => {
        if (!err) {
            if (result.insertId > 0) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Successfully inserted",
                    rows: null,
                    row: null,
                    insertId: result.insertId
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    message: "İnsert failed",
                    rows: null,
                    row: null,
                    insertId: null
                });
            }
        } else {
            console.log("Error:", err);
            return res.status(400).json({
                statusCode: 400,
                message: err,
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

// PUT: Row by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = generateUpdateQuery(id, req.body);
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.affectedRows === 1) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Successfully updated",
                    rows: null,
                    row: null,
                    insertId: null
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Update failed",
                    rows: null,
                    row: null,
                    insertId: null
                });
            }
        } else {
            console.log("Error:", err);
            return res.status(400).json({
                statusCode: 400,
                message: err,
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

// DELETE: Row by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM `"+table+"` WHERE id = "+ id;
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.affectedRows === 1) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Successfully deleted",
                    rows: null,
                    row: null,
                    insertId: null
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Delete failed",
                    rows: null,
                    row: null,
                    insertId: null
                });
            }
        } else {
            console.log("Error:", err);
            return res.status(400).json({
                statusCode: 400,
                message: err,
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

// PUT: Change statu by id
router.put('/changeStatu/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.length > 0) {
                let statu = result[0].statu;
                statu = (statu === 1) ? 0 : 1;
                let changeQuery = "UPDATE `"+table+"` SET `statu` = "+statu+" WHERE id = " + id;
                connection.query(changeQuery, (err, result) => {
                    if (!err) {
                        if (result.affectedRows === 1) {
                            return res.status(200).json({
                                statusCode: 200,
                                message: "Statu changed:" + (statu === 1 ? "[Active]" : "[Passive]"),
                                rows: null,
                                row: null,
                                insertId: null
                            });
                        } else {
                            return res.status(400).json({
                                statusCode: 400,
                                message: "Changed failed",
                                rows: null,
                                row: null,
                                insertId: null
                            });
                        }
                    } else {
                        console.log("Error:", err);
                        return res.status(400).json({
                            statusCode: 400,
                            message: err,
                            rows: null,
                            row: null,
                            insertId: null
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Row not found!",
                    rows: null,
                    row: null,
                    insertId: null
                });
            }
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: "Row not found!",
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

const generateUpdateQuery = function (id, cols) {
    let query = "UPDATE `"+table+"` SET ";
    Object.keys(cols).forEach(function (key, i) {
        if (i > 0) {
            query += ",";
        }
        query += "`"+key+"`='"+cols[key]+"'";
    });
    query += " WHERE id = " + id;
    return query;
}

export default router;