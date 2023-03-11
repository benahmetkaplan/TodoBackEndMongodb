import express from "express";
import pgClient from '../config/db.js';

const router = express.Router();
const table = "events";

// GET: List all rows
router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM ${table}`;
        const { rows } = await pgClient.query(query);
        return res.status(200).json({
            rows: rows
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({
            message: error.message
        });
    }
});

// GET: Row by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        const { rows } = await pgClient.query(query);
        if (rows.length > 0) {
            return res.status(200).json({
                rows: rows[0]
            });
        }else{
            return res.status(400).json({
                message: 'Row not found!'
            });
        }
    } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({
            message: error.message
        });
    }
});

// POST: Create row
router.post('/', async (req, res) => {
    try {
        const query = `INSERT INTO ${table} (title, content) VALUES($1, $2) RETURNING *`;
        const values = [req.body.title, req.body.content];
        const { rows } = await pgClient.query(query, values);
        return res.status(201).json({
            rows: rows[0]
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({
            message: error.message
        });
    }
});

// PUT: Row by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = createUpdateQuery(id, req.body);
        const values = Object.keys(req.body).map(function (key) {
            return req.body[key];
        });
        const result = await pgClient.query(query, values);
        if (!result.err) {
            return res.status(200).json({
                message: "Successfully updated!",
                rows: result.rows[0]
            });
        }else{
            console.log(`Error: ${result.err.stack}`);
        }
    } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({
            message: error.message
        });
    }
});

// DELETE: Row by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM ${table} WHERE id = ${id}`;
        const result = await pgClient.query(query);
        return res.status(200).json({
            message: 'Row deleted!'
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({
            message: error.message
        });
    }
});

const createUpdateQuery = function (id, cols) {
    var query = ['UPDATE ' + table];
    query.push('SET');
    var set = [];
    Object.keys(cols).forEach(function (key, i) {
        set.push(key + ' = ($' + (i + 1) + ')'); 
    });
    query.push(set.join(', '));
    query.push('WHERE id = ' + id );
    query = query.join(' ');
    query += ' RETURNING *';
    return query;
}

export default router;