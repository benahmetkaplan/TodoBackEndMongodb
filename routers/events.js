import express from "express";
import qp from '../config/queryProviders.js';

const router = express.Router();
const table = "events";

// GET: List all rows
router.get('/', (request, res) => {
    qp.table(table)
    .then(data => {
        return res.status(200).json({
            statusCode: 200,
            message: "Successfully",
            rows: data,
            row: null,
            insertId: null
        });
    })
    .catch(data => {
        console.log("Error:", data);
        return res.status(400).json({
            statusCode: 400,
            message: "Rows not found!",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

// GET: Row by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    qp.row(table, id)
    .then(data => {
        if (typeof data === "object") {
            return res.status(200).json({
                statusCode: 200,
                message: "Successfully",
                rows: null,
                row: data,
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
    })
    .catch(data => {
        console.log("Error:", data);
        return res.status(400).json({
            statusCode: 400,
            message: "Row not found!",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

// POST: Create row
router.post('/', (req, res) => {
    qp.insert(table, req.body)
    .then(data => {
        if (data.insertId !== undefined && data.insertId > 0) {
            qp.row(table, data.insertId)
            .then(rowData => {
                if (typeof rowData === "object") {
                    return res.status(200).json({
                        statusCode: 200,
                        message: "Successfully",
                        rows: null,
                        row: rowData,
                        insertId: data.insertId
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
            })
            .catch(data => {
                console.log("Error:", data);
                return res.status(400).json({
                    statusCode: 400,
                    message: "İnsert failed!",
                    rows: null,
                    row: null,
                    insertId: null
                });
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
    })
    .catch(data => {
        console.log("Error:", data);
        return res.status(400).json({
            statusCode: 400,
            message: "İnsert failed",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

// PUT: Row by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    qp.update(table, id, req.body)
    .then(data => {
        if (data.affectedRows === 1) {
            qp.row(table, id)
            .then(rowData => {
                if (typeof rowData === "object") {
                    return res.status(200).json({
                        statusCode: 200,
                        message: "Successfully",
                        rows: null,
                        row: rowData,
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
            })
            .catch(data => {
                console.log("Error:", data);
                return res.status(400).json({
                    statusCode: 400,
                    message: "Update failed!",
                    rows: null,
                    row: null,
                    insertId: null
                });
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
    })
    .catch(data => {
        console.log("Error:", data);
        return res.status(400).json({
            statusCode: 400,
            message: "Update failed",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

// DELETE: Row by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    qp.delete(table, id)
    .then(data => {
        if (data.affectedRows === 1) {
            return res.status(200).json({
                statusCode: 200,
                message: "Successfully",
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
    })
    .catch(data => {
        console.log("Error:", data);
        return res.status(400).json({
            statusCode: 400,
            message: "Delete failed",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

// PUT: Change statu by id
router.put('/changeStatu/:id', (request, response) => {
    const { id } = request.params;
    qp.cell(table, 'statu', id)
    .then(data => {
        let statu = data;
        statu = (statu === 1) ? 0 : 1;
        qp.update(table, id, { statu: statu })
        .then(data => {
            if (data.affectedRows === 1) {
                qp.row(table, id)
                .then(rowData => {
                    if (typeof rowData === "object") {
                        return response.status(200).json({
                            statusCode: 200,
                            message: "Successfully",
                            rows: null,
                            row: rowData,
                            insertId: null
                        });
                    } else {
                        return response.status(400).json({
                            statusCode: 400,
                            message: "Row not found!",
                            rows: null,
                            row: null,
                            insertId: null
                        });
                    }
                })
                .catch(data => {
                    console.log("Error:", data);
                    return response.status(400).json({
                        statusCode: 400,
                        message: "Change failed!",
                        rows: null,
                        row: null,
                        insertId: null
                    });
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
        })
        .catch(data => {
            console.log("Error:", data);
            return response.status(400).json({
                statusCode: 400,
                message: "Change failed",
                rows: null,
                row: null,
                insertId: null
            });
        });
    })
    .catch(data => {
        console.log("Error:", data);
        return response.status(400).json({
            statusCode: 400,
            message: "Data not found!",
            rows: null,
            row: null,
            insertId: null
        });
    });
});

export default router;