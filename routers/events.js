import express from "express";
const router = express.Router();

import Event from '../models/events.js';

// POST
router.post('/', (req, res) => {
    const event = new Event({
        title: req.body.title,
        content: req.body.content,
        statu: req.body.statu
    });
    event.save()
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log("Error:", err);
        return res.status(400).json(err);
    });
});

// GET
router.get('/', (request, res) => {
    Event.find()
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log("Error:", err);
        return res.status(400).json(err);
    });
});

// GET
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Event.findById(id)
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log("Error:", err);
        return res.status(400).json(err);
    });
});

// PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    Event.updateOne({_id: id}, req.body)
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log("Error:", err);
        return res.status(400).json(err);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Event.deleteOne({_id: id})
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((err) => {
        console.log("Error:", err);
        return res.status(400).json(err);
    });
});

export default router;