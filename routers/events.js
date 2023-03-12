import express from "express";
import connection from '../config/db.js';

const router = express.Router();
const table = "events";

// GET: List all rows
router.get('/', async (req, res) => {
    const query = `SELECT * FROM ${table}`;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                rows: result
            });
        }else{
            console.log("Error:", err);
            return res.status(400).json({
                message: err
            });
        }
    });
});

// GET: Row by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                rows: result
            });
        }else{
            console.log("Error:", err);
            return res.status(400).json({
                message: err
            });
        }
    });
});

// POST: Create row
router.post('/', async (req, res) => {
    const query = `INSERT INTO ${table} (title, content, statu) VALUES(?,?,?)`;
    const values = [req.body.title, req.body.content, req.body.statu];
    connection.query(query, values, (err, result) => {
        if (!err) {
            if (result.insertId > 0) {
                return res.status(200).json({
                    message: "Successfully inserted",
                    insertId: result.insertId
                });
            }else{
                return res.status(400).json({
                    message: "İnsert failed"
                });
            }            
        }else{
            console.log("Error:", err);
            return res.status(400).json({
                message: err
            });
        }
    });
});

// PUT: Row by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const query = generateUpdateQuery(id, req.body);
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.affectedRows === 1) {
                return res.status(200).json({
                    message: "Successfully updated"
                });
            }else{
                return res.status(400).json({
                    message: "Update failed"
                });
            }
        }else{
            console.log("Error:", err);
            return res.status(400).json({
                message: err
            });
        }
    });
});

// DELETE: Row by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM `"+table+"` WHERE id = "+ id;
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.affectedRows === 1) {
                return res.status(200).json({
                    message: "Successfully deleted"
                });
            }else{
                return res.status(400).json({
                    message: "Delete failed"
                });
            }
        }else{
            console.log("Error:", err);
            return res.status(400).json({
                message: err
            });
        }
    });
});

// PUT: Change statu by id
router.put('/changeStatu/:id', async (req, res) => {
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
                                message: "Statu changed:" + (statu === 1 ? "[Active]" : "[Passive]")
                            });
                        }else{
                            return res.status(400).json({
                                message: "Changed failed"
                            });
                        }
                    }else{
                        console.log("Error:", err);
                        return res.status(400).json({
                            message: err
                        });
                    }
                });
            }else{
                return res.status(400).json({
                    message: "Bu id'ye ait kayıt bulunamadı"
                });
            }
        }else{
            return res.status(400).json({
                message: "Bu id'ye ait kayıt bulunamadı"
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