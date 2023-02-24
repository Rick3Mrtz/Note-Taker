const html = require('express').Router();
const path = require('path');
// Html.js should include GET method to return the Notes.html file

html.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET method for returning to index.html

html.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;