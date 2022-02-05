const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route: 1 For fetching the all Notes using GET-> Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
})

//Route: 2 For Adding the Notes using POST -> Login Required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter Title').not().isEmpty(),
    body('description', 'Enter at least 10 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Create a new Note
        const note = new Notes({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error" });
    }
})

//Route: 3 For Updating the Note using PUT -> Login Required
router.put('/fetchallnotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //check wheather the Note exist or Not
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send({ error: "File Not Found." }) }

        //check wheather the user is one who can access?
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
})

//Route: 4 For Deleting the Notes using DELETE-> Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //check wheather the note exist for not.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send('File not Found') }

        //check wheather the user is same to whom the note belong.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({ Success: 'File has been Deleted.', note: note })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
})

module.exports = router;