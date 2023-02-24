// GET method for /api/notes which should read db.json file

app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/db/db.json'))
);


const newNotes = require('')

// POST method to create new note to save on req body, then add to DB.JSON. Give unique ID

app.post('/api/notes/:notes_id', (req, res) => {
    if (req.body && req.params.notes_id) {
        console.info(`${req.method} request received to create a new note`);
        const noteId = req.params.notes_id;

        for (let i = 0; i < newNotes.length; i++) {
            const currentNote = newNotes[i];
            if (currentNote.notes_id === noteId) {res.status(200).json(currentNote);
                return;
            }
        }
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided')
    }
});

// BONUS write a DELETE method to delete a note with a specific ID. DELETE /api/notes/:id

// First things first, would need to read all notes from db.json file, then specify note by ID to delete, then rewrite notes to db.json file.