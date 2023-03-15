import express from "express";
import qp from '../config/queryProviders.js';

const router = express.Router();
const table = "events";

// GET: List all rows
router.get('/', (req, res) => {
    qp.getDataTable(table, (err, result) => {
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
    qp.getDataRow(table, id, (err, result) => {
        if (!err) {
            if (typeof result === 'object') {
                return res.status(200).json({
                    statusCode: 200,
                    message: null,
                    rows: null,
                    row: result,
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
    qp.insertRow(table, req.body, (err, result) => {
        if (!err) {
            if (typeof result === 'number') {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Successfully inserted",
                    rows: null,
                    row: null,
                    insertId: result
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
    qp.updateRow(table, id, req.body, (err, result) => {
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
    qp.deleteRow(table, id, (err, result) => {
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
router.put('/changeStatu/:id', (request, response) => {
    const { id } = request.params;
    qp.getDataCell(table, 'statu', id, (error, result) => {
        if (!error) {
            let statu = result;
            statu = (statu === 1) ? 0 : 1;
            qp.updateRow(table, id, {statu: statu}, (err, res) => {
                if (!err) {
                    if (res.affectedRows === 1) {
                        return response.status(200).json({
                            statusCode: 200,
                            message: "Successfully changed",
                            rows: null,
                            row: null,
                            insertId: null
                        });
                    } else {
                        return response.status(400).json({
                            statusCode: 400,
                            message: "Change failed",
                            rows: null,
                            row: null,
                            insertId: null
                        });
                    }
                }else{
                    return response.status(400).json({
                        statusCode: 400,
                        message: "Change failed",
                        rows: null,
                        row: null,
                        insertId: null
                    });
                }
            });
        }else{
            return response.status(400).json({
                statusCode: 400,
                message: "Row not found!",
                rows: null,
                row: null,
                insertId: null
            });
        }
    });
});

export default router;