const api = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// GET method for /api/notes which should read db.json file
api.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../db/db.json'))
);

const newNotes = [] //require('')

// POST method to create new note to save on req body, then add to DB.JSON. Give unique ID
api.post('/notes', (req, res) => {
    console.log('You\'ve hit the /api/notes endpoint using a POST method');

    // destructure title and text from the request body.
    const { title, text } = req.body;

    if (req.body) {
        console.info(`${req.method} request received to create a new note`);

        // create new note object
        const newNote = {
            title: title,
            text: text,
            note_id: uuidv4()
        }

        // append the new note to our existing db.json file
        readAndAppend(newNote, path.join(__dirname, '../db/db.json'));
        res.status(200).json({ mess: 'New note added successfully', newNote });

        // for (let i = 0; i < newNotes.length; i++) {
        //     const currentNote = newNotes[i];
        //     if (currentNote.notes_id === noteId) {
        //         res.status(200).json(currentNote);
        //         return;
        //     }
        // }
        // res.status(404).send('Note not found');
    } else {
        res.status(400).send('No body to POST request. Please add note title and text.')
    }
});

// BONUS write a DELETE method to delete a note with a specific ID. DELETE /api/notes/:id

// First things first, would need to read all notes from db.json file, then specify note by ID to delete, then rewrite notes to db.json file.
api.delete('/notes/:id', (req, res) => {
    // store the id to delete in a constant
    const idToDelete = req.params.id;
    let noteIndex;

    readFromFile(path.join(__dirname, '../db/db.json'))
    .then((data) => JSON.parse(data))
    .then((parsedData) => {
        noteIndex = parsedData.findIndex( note => note.id = idToDelete);
        // effectively removed the note with id idTodelete at index noteIndex
        parsedData.splice(noteIndex, 1);
        // write to db.json file now, remembering to stringify the content
        writeToFile(path.join(__dirname, '../db/db.json'), parsedData);
    })
})

module.exports = api;