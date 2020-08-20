const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

const app = express()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.get('/api/notes', (req, res) => {
  res.send(db);
})

app.post('/api/notes', (req, res) => {
  let newNote = req.body;

  //read existing notes and append new one
  fs.readFile("./db/db.json", (err, data) => {
    let existingNotes = JSON.parse(data);
    if (err) {
      throw err;
    } else {
      id = existingNotes.length + 1;
      newNote.id = id;
      existingNotes.push(newNote);
    };

      fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err) => {
        if (err) {
          throw err;
        };
      });

  });

  res.send(201);

});

app.delete('/api/notes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile("./db/db.json", (err, data) => {
    let existingNotes = JSON.parse(data);
    if (err) {
      throw err;
    } else {
      for (let i=0; i < existingNotes.length; i++) {
        currentNoteId = existingNotes[i].id;
        console.log(currentNoteId)
        if (existingNotes[i].id === id) {
          let index = existingNotes.indexOf(existingNotes[i]);
          let updatedNotes = existingNotes.splice(index, 1);
        };
      };
    };

      fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err) => {
        if (err) {
          throw err;
        };
      });

  });

  res.send(200);

}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})